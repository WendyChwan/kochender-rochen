import './RecipeList.css';
import { Recipe } from "../hooks/use-recipes";
import { RecipePreview } from "./RecipePreview";

interface Props {
	recipes: Recipe[];
}

export const RecipeList: React.FC<Props> = props => {
	const { recipes } = props;

	return (
		<div className='recipe-list'>
			{ recipes.map(r => (
				<RecipePreview key={r.path} recipe={r} />
			)) }
		</div>
	)
}