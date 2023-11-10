import { SetState } from "@/types";
import "./SearchField.css";
import { useEffect, useState } from "react";

interface Props {
	search: string;
	setSearch: SetState<string>;
}

export const SearchField: React.FC<Props> = ({ search, setSearch }) => {
	const [textInput, setTextInput] = useState<HTMLInputElement | null>(null);

	useEffect(() => {
		if (textInput !== null) {
			textInput.select();
		}
	}, [textInput]);

	return (
		<div className="search-field">
			<input ref={setTextInput} className="_input" type="text" placeholder="Suche nach Rezepten..." value={search} onChange={e => setSearch(e.target.value)} />
			{ search !== '' && (<button className="_clear" type="button" onClick={() => setSearch('')}>×</button>) }
		</div>
	);
}