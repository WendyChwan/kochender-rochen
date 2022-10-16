import { SearchSuggestion } from './SearchSuggestion';
import './SearchSuggestions.css';

interface Props {
	setSearch: (value: string) => void;
}

const searchSuggestions = ['Pasta', 'Reis', 'Kartoffel', 'Süß', 'Salat', 'Suppe', 'Vegan', 'Vegetarisch'];

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