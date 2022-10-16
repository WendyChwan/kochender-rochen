import React from 'react';
import { useRecipes } from '../hooks/use-recipes';
import './App.css';
import { Banner } from './Banner';
import { Loading } from './Loading';
import { Search } from './Search';


const App: React.FC = () => {
	const recipes = useRecipes();

	return (
		<div className="app">
			<Banner />
			{ recipes === undefined
				? (<Loading />)
				: (<Search recipes={recipes} />)
			}
		</div>
	);
}

export default App;
