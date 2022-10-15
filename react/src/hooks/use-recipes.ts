import { useEffect, useState } from "react";

interface RecipeDTO {
	fileName: string;
	content: string;
}

export interface Recipe {
	name: string;
	fileName: string;
	link: string;
	document: Section[];
}

export interface Section {
	heading: string;
	content: string;
}

export const useRecipes = () => {
	const [recipes, setRecipes] = useState<Recipe[] | undefined>();

	useEffect(() => {
		(async () => {
			const response = await fetch('/recipes.json');
			const json = await response.json() as RecipeDTO[];
			setRecipes(convertToRecipes(json));
		})();
	}, [])

	return recipes;
}

const convertToRecipes = (dtos: RecipeDTO[]): Recipe[] => {
	return dtos.map(dto => {	
		const name = removeFileExtension(dto.fileName);

		return {
			name: name,
			fileName: dto.fileName,
			link: '/rezept/' + name,
			document: parseMarkDown(dto.content)
		};
	});
}

const removeFileExtension = (fileName: string): string => {
	const index = fileName.lastIndexOf('.');
	if (index > 0) {
		return fileName.substring(0, index);
	}
	else {
		return fileName;
	}
}

const parseMarkDown = (markdown: string): Section[] => {
	const split = markdown.split(/^#{1,6}/gm);
	
	return split.map(section => {
		const splitIndex = section.indexOf('\n');
		return {
			heading: section.substring(0, splitIndex).trim(),
			content: section.substring(splitIndex).trim()
		}
	}).filter(section => section.heading === '');
}