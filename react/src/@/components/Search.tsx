import { useEffect, useMemo, useState } from "react";
import { Recipe } from '@/entities';
import { RecipeList, SearchField, SearchSuggestions } from '.';
import { InfoBox } from './InfoBox';
import { rankRecipes } from "@/lib";

interface Props {
	recipes: Recipe[];
	searchSuggestions: string[];
}

export const Search: React.FC<Props> = ({ recipes, searchSuggestions }) => {
	const [search, setSearch] = useState<string>(() => getSearchLocation());

	useEffect(() => {
		const syncSearch = () => setSearch(getSearchLocation());
		window.addEventListener('popstate', syncSearch);
		return () => window.removeEventListener('popstate', syncSearch)
	}, []);

	useEffect(() => {
		if (search !== getSearchLocation()) {
			const timeoutId = setTimeout(
				() => setSearchLocation(search),
				1000
			);
			return () => clearTimeout(timeoutId);
		}
	}, [search]);

	const searchResult = useMemo(() => rankRecipes(recipes, search), [search, recipes]);

	return (
		<>
			<SearchField search={search} setSearch={setSearch} />
			{ search !== '' && searchResult.length === 0
				&& (<InfoBox text="Keine Rezepte gefunden." />)
			}
			{ searchResult.length === 0
				? (<SearchSuggestions setSearch={setSearch} searchSuggestions={searchSuggestions} />)
				: (<RecipeList recipes={searchResult} />)
			}
		</>
	);
}

const getSearchLocation = () => decodeURI(new URLSearchParams(window.location.search).get('search') ?? '');

const setSearchLocation = (search: string) => window.history.pushState({}, '', search === '' ? '/' : process.env.PUBLIC_URL + '/?search=' + encodeURI(search))
