import React, { useState, useEffect } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Recipe from '../../components/recipeCard';
import styles from './LoggedHomePage.module.css';
import { Link } from 'react-router-dom';

const LoggedHomePage = () => {
    const [recipes, setRecipes] = useState([]);
    const [filterCriteria, setFilterCriteria] = useState('');
    const [filterContent, setFilterContent] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const promise = await fetch('http://localhost:8000/api/recipe');
            const recipesObject = await promise.json();
            setRecipes(recipesObject.map(e => ({ ...e, show: 'true' })));
        };
        fetchData();
    }, []);

    const sortHandler = (e, type) => {
        setRecipes(recipes.sort((a, b) => {
            if (type === 'alphabetical') return a.meal.localeCompare(b.meal);
            else if (type === 'likes') return b.likes.length - a.likes.length;
            else if (type === 'comments') return b.comments.length - a.comments.length;
            else return b.ingredients.length - a.ingredients.length;
        }));
    }

    const filterCriteriaHandler = (e, type) => {
        if (type === 'nothing') {
            setRecipes(recipes.map(e => ({ ...e, show: true })));
        }
        setFilterCriteria(type);
    }

    const filterHandler = (e) => {

        if (!filterCriteria) return;

        else if (filterCriteria === 'ingredients') {
            const ingredients = filterContent.split(', ');
            setRecipes(recipes.map(e => {
                if(ingredients.every(e1 => [...e.ingredients].includes(e1)))
                    return {...e, show: true};
                else return {...e, show: false};
            }));
            return;
        }

        setRecipes(recipes.map(e => ({ ...e, show: e[filterCriteria].includes(filterContent) })));
    }

    return (<>
        <Header />
        <h1 className="text-center">Our Recipes</h1>


        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <div className="dropdown">
                    <button className={`btn btn-secondary dropdown-toggle ${styles['filter-button']}`} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Sort by
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <Link className="dropdown-item" onClick={e => sortHandler(e, 'alphabetical')}>Alphabetical order</Link>
                        <Link className="dropdown-item" onClick={e => sortHandler(e, 'likes')}>By count of likes</Link>
                        <Link className="dropdown-item" onClick={e => sortHandler(e, 'comments')}>By count of comments</Link>
                        <Link className="dropdown-item" onClick={e => sortHandler(e, 'ingredients')}>By count of ingredients</Link>
                    </div>
                </div>
                <div className="dropdown">
                    <button className={`btn btn-secondary dropdown-toggle`} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {filterCriteria ? `Filter by: ${filterCriteria}` : "Filter by:"}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <Link className="dropdown-item" onClick={e => filterCriteriaHandler(e, 'nothing')}>Nothing</Link>
                        <Link className="dropdown-item" onClick={e => filterCriteriaHandler(e, 'meal')}>Meal</Link>
                        <Link className="dropdown-item" onClick={e => filterCriteriaHandler(e, 'ingredients')}>Ingredients</Link>
                        <Link className="dropdown-item" onClick={e => filterCriteriaHandler(e, 'description')}>Description</Link>
                        <Link className="dropdown-item" onClick={e => filterCriteriaHandler(e, 'prepMethod')}>Prep Method</Link>
                    </div>
                </div>
            </div>
            <input type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1"
                onChange={e => {
                    setFilterContent(e.target.value);
                }} />
            <button type="button" className="btn btn-light" style={{ marginLeft: '30px' }}
                onClick={e => filterHandler(e)}>Filter</button>
        </div>



        {[...recipes].filter(e => e.show).length === 0 ? (
            <div className={styles['foodNotFound']}>
                <img src="https://t4.ftcdn.net/jpg/00/62/17/31/240_F_62173114_ozantkVtkPgzL0fxssAkTqKX1FHPr0UW.jpg" alt="FoodNotFound"/>
                <h3>Food not found...</h3>
            </div>
        ) : (
            <div id="sharedRecipes">
                {[...recipes].filter(e => e.show).map((e, i) => {
                    return <Recipe key={i} id={e._id} recipe={e} />
                })}
            </div>
        )}
        <Footer />
    </>);
}

export default LoggedHomePage;