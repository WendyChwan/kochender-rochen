import './Search.css';
import { useEffect, useState } from "react";
import { rankRecipes } from "../code/search";
import { Recipe } from "../hooks/use-recipes";
import { SearchField } from './SearchField';
import { RecipeList } from './RecipeList';
import { SearchSuggestions } from './SearchSuggestions';
import { NoSearchResult } from './NoSearchResults';
import { SearchSuggestion } from './SearchSuggestion';

interface Props {
	recipes: Recipe[];
}

const getSearchLocation = () => new URLSearchParams(window.location.search).get('search') ?? '';

export const Search: React.FC<Props> = props => {
	const { recipes } = props;

	const [searchString, setSearchString] = useState<string>(() => getSearchLocation());

	useEffect(() => {
		const syncSearch = () => setSearchString(getSearchLocation());
		window.addEventListener('popstate', syncSearch);
		return () => window.removeEventListener('popstate', syncSearch)
	}, []);

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
			{ searchString === ''
				&& (<SearchSuggestions setSearch={setSearchString} />)
			}
			{ searchResult.length !== 0
				&& (<RecipeList recipes={limit(searchResult, 20)} />)
			}
			{
				searchString !== '' && searchResult.length === 0
				&& (<>
					<NoSearchResult />
					<SearchSuggestions setSearch={setSearchString} />
				</>)
			}
		</>
	);
}

const limit = <T,>(list: T[], limit: number) => {
	return list.filter((v, i) => i < limit);
}