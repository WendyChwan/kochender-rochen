import { Recipe } from "@/entities";
import "./RecipeList.css";
import { RecipePreview } from "./RecipePreview";

interface Props {
	recipes: Recipe[];
}

export const RecipeList: React.FC<Props> = ({ recipes }) => {
	return (
		<div className="recipe-list">
			{ recipes.map(r => (
				<RecipePreview key={r.path} recipe={r} />
			)) }
		</div>
	)
}