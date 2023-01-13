import { SetState } from "@/types";
import "./SearchSuggestion.css";

interface Props {
	search: string;
	setSearch: SetState<string>;
}

export const SearchSuggestion: React.FC<Props> = ({ search, setSearch }) => {
	return (
		<button className="search-suggestion" onClick={() => setSearch(search)}>{search === '*' ? 'Alle' : search}</button>
	)
}