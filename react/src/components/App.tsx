import React from 'react';
import { useRecipes } from '../hooks/use-recipes';
import './App.css';
import { Search } from './Search';


const App: React.FC = () => {
	const recipes = useRecipes();

	return (
		<div className="App">
			{ recipes !== undefined && (
				<Search recipes={recipes} />
			) }
		</div>
	);
}

export default App;
