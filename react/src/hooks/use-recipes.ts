import { useEffect, useState } from "react";

interface RecipeDTO {
	fileName: string;
	content: string;
}

export interface Recipe {
	title: string;
	path: string;
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
			const json: RecipeDTO[] = await response.json();
			setRecipes(convertToRecipes(json));
		})();
	}, [])

	return recipes;
}

const convertToRecipes = (dtos: RecipeDTO[]): Recipe[] => {
	return dtos.map(dto => {	
		const fileName = removeFileExtension(dto.fileName);
		const markDown = parseMarkDown(dto.content);
		const firstSection = markDown.at(0);

		const result: Recipe = {
			path: '/rezept/' + fileName,
			document: markDown,
			title: firstSection === undefined ? fileName : firstSection.heading
		};

		return result;
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
	}).filter(section => section.heading !== '');
}