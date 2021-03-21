import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Recipe from '../components/recipeCard';

const LoggedHomePage = () => {
    const [recipes, setRecipes] = useState([]);
    
    useEffect(async () => {
        const promise = await fetch('http://localhost:8000/api/recipe');
        const recipesObject = await promise.json();
        console.log(recipesObject);
        setRecipes(recipesObject);
    }, []);

    return (<>
        <Header />
        <h1 class="text-center">Our Recipes</h1>

        {[...recipes].length == 0 ? (
            <div id='foodNotFound'>
                <img src="https://t4.ftcdn.net/jpg/00/62/17/31/240_F_62173114_ozantkVtkPgzL0fxssAkTqKX1FHPr0UW.jpg" />
                <h3>Food not found...</h3>
            </div>
        ) : (
            <div id="sharedRecipes">
                {[...recipes].map((e, i) => {
                    return <Recipe key={i} id={e._id} recipe={e}/>
                })}
            </div>
        )}
        <Footer />
    </>);
}

export default LoggedHomePage;