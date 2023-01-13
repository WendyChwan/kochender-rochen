import { SetState } from "@/types";
import "./SearchField.css";

interface Props {
	search: string;
	setSearch: SetState<string>;
}

export const SearchField: React.FC<Props> = ({ search, setSearch }) => {

	return (
		<div className="search-field">
			<input className="_input" type="text" placeholder="Suche nach Rezepten..." value={search} onChange={e => setSearch(e.target.value)} />
			{ search !== '' && (<button className="_clear" type="button" onClick={() => setSearch('')}>×</button>) }
		</div>
	);
}