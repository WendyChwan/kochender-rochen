import './Search.css';
import { useState } from "react";
import { rankRecipes } from "../code/search";
import { Recipe } from "../hooks/use-recipes";

interface Props {
	recipes: Recipe[];
}

export const Search: React.FC<Props> = props => {
	const { recipes } = props;

	const [searchString, setSearchString] = useState<string>('');

	console.log(recipes);
	const searchResult = rankRecipes(recipes, searchString);
	console.log(searchResult);

	return (
		<div>
			<input type='text' onChange={e => setSearchString(e.target.value)} />
			<div className='search-results'>
				{ searchResult.map(r => (
					<div><a href={r.link} target='_blank' rel='noreferrer'>{r.name}</a></div>
				)) }
			</div>
		</div>
	);
}