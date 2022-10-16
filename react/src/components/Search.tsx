import './Search.css';
import { useEffect, useRef, useState } from "react";
import { rankRecipes } from "../code/search";
import { Recipe } from "../hooks/use-recipes";
import { SearchField } from './SearchField';
import { RecipeList } from './RecipeList';
import { SearchSuggestions } from './SearchSuggestions';
import { NoSearchResult } from './NoSearchResults';

interface Props {
	recipes: Recipe[];
}

const getSearchLocation = () => decodeURI(new URLSearchParams(window.location.search).get('search') ?? '');

export const Search: React.FC<Props> = props => {
	const { recipes } = props;

	const [searchString, setSearchString] = useState<string>(() => getSearchLocation());

	useEffect(() => {
		const syncSearch = () => setSearchString(getSearchLocation());
		window.addEventListener('popstate', syncSearch);
		return () => window.removeEventListener('popstate', syncSearch)
	}, []);

	useEffect(() => {
		if (searchString !== getSearchLocation()) {
			const timeoutId = setTimeout(
				() => window.history.pushState({}, '', searchString === '' ? '/' : '/?search=' + encodeURI(searchString)),
				1000
			);
			return () => clearTimeout(timeoutId);
		}
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
			{ searchString !== '' && searchResult.length === 0
				&& (<>
					<NoSearchResult />
					<SearchSuggestions setSearch={setSearchString} />
				</>)
			}
		</>
	);
}

const limit = <T,>(list: T[], limit: number) => {
	return list.filter((_, i) => i < limit);
}