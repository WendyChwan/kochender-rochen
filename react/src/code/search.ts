import { Recipe, Section } from "../hooks/use-recipes";


export const rankRecipes = (allRecipes: Recipe[], searchString: string): Recipe[] => {
	const [includeMap, excludeMap] = Search.parse(searchString);

	const recipes = allRecipes.filter(recipe => !isRecipeExcluded(recipe, excludeMap));

	const rankedRecipes = recipes.map(r => rankRecipe(r, includeMap));

	const result = rankedRecipes.filter(([rank, _]) => rank > 0).sort(([rankA, _], [rankB, __]) => rankB - rankA).map(([_, recipe]) => recipe);

	return result;
}

const rankRecipe = (recipe: Recipe, includeMap: Search): [number, Recipe] => {
	let rank = 0;
	
	if (includeMap.get('tags').some(v => recipe.name.includes(v))) {
		rank++;
	}

	rank += recipe.document.map(section => includeMap.get(section.heading).map<number>(searchKey => section.content.includes(searchKey) ? 1 : 0).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0);

	return [rank, recipe];
}

const isRecipeExcluded = (recipe: Recipe, excludeMap: Search): boolean => {
	return recipe.document.some(section => isSectionExcluded(section, excludeMap));
}

const isSectionExcluded = (section: Section, excludeMap: Search): boolean => {
	const excludedText = excludeMap.get(section.heading);
	return excludedText.some(text => section.content.includes(text));
}

const removeQuotes = (str: string): string => {
	if (str.at(0) === '"' && str.at(str.length - 1) === '"') {
		return str.substring(1, str.length - 2);
	}
	else {
		return str;
	}
}

class Search {
	public static parse(searchString: string) {
		const matches = searchString.match(/(-?((\w+|".+?"):(\w+|".+?")|(\w+|".+?")))+/g) ?? [];
	
		const excludeList = matches.filter(m => m[0] === '-').map(m => m.substring(1));
		const includeList = matches.filter(m => m[0] !== '-');
	
		const excludeMap = new Search(excludeList);
		const includeMap = new Search(includeList);
	
		return [includeMap, excludeMap];
	}

	private constructor(searchKeys: string[]) {
		this.map = new Map<string, string[]>();

		for (const part of searchKeys) {
			const res = part.match(/\w+|".+?"/g)?.map(p => removeQuotes(p));
	
			if (res === undefined || res.length === 0) { }
			else if (res.length === 1) {
				this.add("tags", res[0]);
			}
			else {
				this.add(res[0].toLocaleLowerCase(), res[1]);
			}
		}
	}

	private map: Map<string, string[]>;

	private add(key: string, value: string): void {
		const arr = this.map.get(key);
		if (arr === undefined) {
			this.map.set(key, [value]);
		}
		else {
			arr.push(value);
		}
	}

	public get(key: string): string[] {
		return this.map.get(key) ?? [];
	}
}