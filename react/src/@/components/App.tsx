import { Recipe, RecipeDTO } from '@/entities';
import { convertToRecipes } from '@/lib';
import React, { useEffect, useState } from 'react';
import { Banner, InfoBox, Search } from '.';
import './App.css';

const searchSuggestions = ['*', 'Vegan', 'Vegetarisch', 'Fleisch', 'Nudeln', 'Reis', 'Kartoffel', 'Süß', 'Scharf', 'Salat', 'Suppe', 'Backen', 'Inspiration'];

export const App: React.FC = () => {
	const [recipes, setRecipes] = useState<Recipe[] | undefined>();
	const [error, setError] = useState<string>();

	useEffect(() => {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => {
			controller.abort();
			setError('Fehler: Das Laden der Rezepte hat zu lange gebraucht.');
		}, 2000);

		fetch(process.env.PUBLIC_URL + '/recipes.json', { signal: controller.signal }).then(response => {
			if (response.ok) {
				response.json().then((json: RecipeDTO[]) => setRecipes(convertToRecipes(json)));
			}
			else {
				setError(`Fehler: ${response.status} ${response.statusText}`);
			}
		}).catch(() => { });

		return () => {
			clearTimeout(timeoutId);
			controller.abort();
		}
	}, []);

	return (
		<div className="app">
			<div className="_content">
				<Banner />
				{ recipes === undefined
					? (<InfoBox text={error ?? 'Rezepte werden geladen...'} />)
					: (<Search recipes={recipes} searchSuggestions={searchSuggestions} />)
				}
			</div>
		</div>
	);
}
