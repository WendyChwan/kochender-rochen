import { Recipe } from "../hooks/use-recipes";

export const rankRecipes = (allRecipes: Recipe[], searchString: string): Recipe[] => {
	const [includeMap, excludeMap] = Search.parse(searchString);

	const recipes = allRecipes.filter(recipe => !isRecipeExcluded(recipe, excludeMap));

	if (includeMap.containsMatchingTags('tags', '*')) return recipes;

	const rankedRecipes = recipes.map(r => rankRecipe(r, includeMap));
	
	// Debugging line
	// console.log(rankedRecipes.map(([ra, re]) => `[${ra}, ${re.title}]`));

	const result = rankedRecipes.filter(([rank, _]) => rank > 0).sort(([rankA, _], [rankB, __]) => rankB - rankA).map(([_, recipe]) => recipe);

	return result;
}

const rankRecipe = (recipe: Recipe, includeMap: Search): [number, Recipe] => {
	let rank = 0;
	
	if (includeMap.containsMatchingTags('tags', recipe.title)) {
		rank++;
	}

	for (const section of recipe.document) {
		rank += includeMap.countMatchingTags(section.heading, section.content);
	}

	return [rank, recipe];
}

const isRecipeExcluded = (recipe: Recipe, excludeMap: Search): boolean => {
	return recipe.document.some(section => excludeMap.containsMatchingTags(section.heading, section.content));
}

class Search {
	public static parse(searchString: string) {
		const matches = match(searchString, /(-?(([^\s"]+|".+?"):([^\s"]+|".+?")|([^\s"]+|".+?")))+/g);
	
		const excludeList = matches.filter(m => m[0] === '-').map(m => m.substring(1));
		const includeList = matches.filter(m => m[0] !== '-');
	
		const excludeMap = new Search(excludeList);
		const includeMap = new Search(includeList);
	
		return [includeMap, excludeMap];
	}

	private constructor(searchKeys: string[]) {
		this.map = new Map<string, string[]>();

		for (const part of searchKeys) {
			const res = match(part, /[^\s":]+|".+?"/gm).map(p => Search.removeQuotes(p));
	
			if (res.length === 0) { }
			else if (res.length === 1) {
				this.add("tags", res[0]);
			}
			else {
				this.add(res[0], res[1]);
			}
		}
	}

	private map: Map<string, string[]>;

	private static removeQuotes(str: string): string {
		str = str.trim();
		if (str.match(/^".*"$/g)) {
			return str.substring(1, str.length - 1);
		}
		else {
			return str;
		}
	}

	private add(key: string, value: string): void {
		key = key.toLowerCase();
		value = value.toLowerCase();
		const arr = this.map.get(key);
		if (arr === undefined) {
			this.map.set(key, [value]);
		}
		else {
			arr.push(value);
		}
	}

	public containsMatchingTags(heading: string, text: string) {
		return this.countMatchingTags(heading, text) > 0;
	}

	public countMatchingTags(heading: string, text: string) {
		const tags = this.get(heading);
		return tags.filter(tag => textContains(text, tag)).length;
	}

	private get(key: string): string[] {
		return this.map.get(key.toLowerCase()) ?? [];
	}
}

const textContains = (text: string, tag: string) => {
	return text.toLowerCase().includes(tag.toLowerCase());
}

const match = (text: string, matcher: { [Symbol.match](string: string): RegExpMatchArray | null; }): RegExpMatchArray => {
	return text.match(matcher) ?? [];
}