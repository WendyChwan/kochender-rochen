import { Recipe } from "@/entities";
import "./RecipePreview.css";

interface Props {
	recipe: Recipe;
}

export const RecipePreview: React.FC<Props> = ({ recipe }) => {
	return (
		<a href={process.env.PUBLIC_URL + recipe.path} target='_self'>
			<div className='recipe-preview'>
				<p className='_title'>{recipe.title}</p>
				<p className="_tags">{recipe.tags.join(', ')}</p>
				<p className='_description'>{recipe.description ?? ''}</p>
			</div>
		</a>
	);
}
