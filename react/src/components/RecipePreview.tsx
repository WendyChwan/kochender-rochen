import './RecipePreview.css';
import { Recipe } from "../hooks/use-recipes";

interface Props {
	recipe: Recipe;
}

export const RecipePreview: React.FC<Props> = props => {
	const { recipe } = props;

	const description = getDescription(recipe);

	return (
		<a className='recipe-preview__a' href={recipe.path} target='_self'>
			<div className='recipe-preview'>
				<p className='__title'>{recipe.title}</p>
				<p className='__description'>{description}</p>
			</div>
		</a>
	);
}

const getDescription = (recipe: Recipe): string => {
	const description = recipe.document.find(section => section.heading.toLowerCase() === 'description');
	const tags = recipe.document.find(section => section.heading.toLowerCase() === 'tags');

	if (description !== undefined)
		return description.content;
	else if (tags !== undefined)
		return tags.content;
	else
		return 'Keine Beschreibung verfügbar.';
}