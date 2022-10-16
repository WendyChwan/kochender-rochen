import './SearchSuggestion.css';

interface Props {
	search: string;
	setSearch: (value: string) => void;
}

export const SearchSuggestion: React.FC<Props> = props => {
	const { search, setSearch } = props;

	return (
		<button className='search-suggestion' onClick={() => setSearch(search)}>{search === '*' ? 'Alle' : search}</button>
	)
}