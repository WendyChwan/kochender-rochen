import { SetState } from '@/types';
import { SearchSuggestion } from './SearchSuggestion';
import './SearchSuggestions.css';

interface Props {
	searchSuggestions: string[]
	setSearch: SetState<string>;
}

export const SearchSuggestions: React.FC<Props> = ({ setSearch, searchSuggestions }) => {
	return (
		<div className="search-suggestions">
			{ searchSuggestions.map(s => (
				<SearchSuggestion key={s} search={s} setSearch={setSearch} />
			)) }
		</div>
	)
}