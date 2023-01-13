import { Section } from ".";

export interface Recipe {
	title: string;
	path: string;
	tags: string[];
	description?: string;
	document: Section[];
}
