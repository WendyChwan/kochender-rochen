import { Recipe, RecipeDTO, Section } from "@/entities";

export const convertToRecipes = (dtos: RecipeDTO[]): Recipe[] => {
	const result = dtos.map(dto => convertToRecipe(dto));

	result.push({
		path: '/rezept/abc',
		document: [],
		title: 'MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM',
		tags: ['MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM'],
		description: 'MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM'
	})
	
	return result;
}

const convertToRecipe = (dto: RecipeDTO): Recipe => {
	const fileName = removeFileExtension(dto.fileName);
	const markDown = parseMarkDown(dto.content);
	const firstSection = markDown.at(0);

	const result: Recipe = {
		path: '/rezept/' + fileName,
		document: markDown,
		title: firstSection === undefined ? fileName : firstSection.heading,
		tags: markDown.find(md => md.heading.toLowerCase() === 'tags')?.content.split(/,\s?/) ?? [],
		description: markDown.find(md => md.heading.toLowerCase() === 'beschreibung')?.content
	};

	return result;
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