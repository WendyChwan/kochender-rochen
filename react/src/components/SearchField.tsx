import './SearchField.css';

interface Props {
	search: string;
	setSearch: (value: string) => void;
}

export const SearchField: React.FC<Props> = props => {
	const { search, setSearch } = props;

	return (
		<div className='search-field'>
			<input type='text' placeholder='Suche nach Rezepten...' value={search} onChange={e => setSearch(e.target.value)} />
			<button type='button' onClick={() => setSearch('')}>{search === '' ? '' : '×'}</button>
		</div>
	);
}