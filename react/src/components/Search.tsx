import './Search.css';
import { useEffect, useState } from "react";
import { rankRecipes } from "../code/search";
import { Recipe } from "../hooks/use-recipes";
import { SearchField } from './SearchField';
import { RecipeList } from './RecipeList';

interface Props {
	recipes: Recipe[];
}

export const Search: React.FC<Props> = props => {
	const { recipes } = props;

	const [searchString, setSearchString] = useState<string>(() => new URLSearchParams(window.location.search).get('search') ?? '');

	useEffect(() => {
		const timeoutId = setTimeout(
			() => window.history.pushState({}, '', searchString === '' ? '/' : '/?search=' + searchString),
			1000
		);
		return () => clearTimeout(timeoutId);
	}, [searchString]);

	const searchResult = rankRecipes(recipes, searchString);

	return (
		<>
			<SearchField search={searchString} setSearch={setSearchString} />
			{ searchResult.length !== 0
				? (<RecipeList recipes={limit(searchResult, 20)} />)
				: (<div>No recipes found...</div>)
			}
		</>
	);
}

const limit = <T,>(list: T[], limit: number) => {
	return list.filter((v, i) => i < limit);
}