import { SearchSuggestion } from './SearchSuggestion';
import './SearchSuggestions.css';

interface Props {
	setSearch: (value: string) => void;
}

const searchSuggestions = ['*', 'Vegan', 'Vegetarisch', 'Fleisch', 'Nudeln', 'Reis', 'Kartoffel', 'Süß', 'Scharf', 'Salat', 'Suppe'];

export const SearchSuggestions: React.FC<Props> = props => {
	const { setSearch } = props;

	return (
		<div className='search-suggestions'>
			{ searchSuggestions.map(s => (
				<SearchSuggestion key={s} search={s} setSearch={setSearch} />
			)) }
		</div>
	)
}