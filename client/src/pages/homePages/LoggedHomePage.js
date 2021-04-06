import React, { useState, useEffect } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Recipe from '../../components/recipeCard';
import styles from './LoggedHomePage.module.css';
import { Link } from 'react-router-dom'; 

const LoggedHomePage = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(async () => {
        const promise = await fetch('http://localhost:8000/api/recipe');
        const recipesObject = await promise.json();
        console.log(recipesObject);
        setRecipes(recipesObject);
    }, []);

    const sortHandler = (e, type) => {
        let sortedRecipes = [];
        sortedRecipes = recipes.sort((a,b) => {
            if(type === 'alphabetical') return a.meal.localeCompare(b.meal);
            else if(type === 'likes') return b.likes.length - a.likes.length;
            else if(type === 'comments') return b.comments.length - a.comments.length;
            else if(type === 'ingredients') return b.ingredients.length - a.ingredients.length;
        });
        setRecipes(sortedRecipes);
    }

    return (<>
        <Header />
        <h1 class="text-center">Our Recipes</h1>
        <div class="dropdown">
            <button class={`btn btn-secondary dropdown-toggle ${styles['filter-button']}`} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sort by
  </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <Link class="dropdown-item" onClick={e => sortHandler(e, 'alphabetical')}>Alphabetical order</Link>
                <Link class="dropdown-item" onClick={e => sortHandler(e, 'likes')}>By count of likes</Link>
                <Link class="dropdown-item" onClick={e => sortHandler(e, 'comments')}>By count of comments</Link>
                <Link class="dropdown-item" onClick={e => sortHandler(e, 'ingredients')}>By count of ingredients</Link>
            </div>
        </div>

        {[...recipes].length == 0 ? (
            <div className={styles['foodNotFound']}>
                <img src="https://t4.ftcdn.net/jpg/00/62/17/31/240_F_62173114_ozantkVtkPgzL0fxssAkTqKX1FHPr0UW.jpg" />
                <h3>Food not found...</h3>
            </div>
        ) : (
            <div id="sharedRecipes">
                {[...recipes].map((e, i) => {
                    return <Recipe key={i} id={e._id} recipe={e} />
                })}
            </div>
        )}
        <Footer />
    </>);
}

export default LoggedHomePage;