import React, { useEffect, useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { useHistory } from 'react-router-dom';
import ErrorBox from '../../components/errorBox';
import setCategoryImage from '../../utils/setCategoryImage';
import styles from './index.module.css';

const EditPage = ({ match }) => {
    const [recipe, setRecipe] = useState({ ingredients: [] });
    const [meal, setMeal] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [prepMethod, setPrepMethod] = useState('');
    const [description, setDescription] = useState('');
    const [foodImageURL, setFoodImageURL] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState({ show: false, errorInfo: '' });
    const history = useHistory();
    const id = match.params.id;

    useEffect(async () => {
        const promise = await fetch(`http://localhost:8000/api/recipe/${id}`);
        const data = await promise.json();
        setRecipe(data);
        setMeal(data.meal);
        setIngredients(data.ingredients.join(', '));
        setPrepMethod(data.prepMethod);
        setDescription(data.description);
        setFoodImageURL(data.foodImageURL);
        setCategory(data.category);
    }, []);

    const formsHandler = (e, type) => {
        const value = e.target.value;
        if (type == 'meal') setMeal(value);
        else if (type == 'ingredients') setIngredients(value);
        else if (type == 'prepMethod') setPrepMethod(value);
        else if (type == 'description') setDescription(value);
        else if (type == 'foodImageURL') setFoodImageURL(value);
        else if (type == 'category') setCategory(value);
    }

    const toggleError = (errorInfo) => {
        setError({ show: true, errorInfo });
        setTimeout(() => {
            setError({ show: false, errorInfo: '' })
        }, 5000);
    }

    const validate = (strings, URLs) => {
        for (const e in strings) {
            if (strings[e].length == 0) {
                toggleError(`${e} should be a non-empty string!`);
                return true;
            }
        }
        for (const e in URLs) {
            if (URLs[e].length === 0 || (!URLs[e].indexOf('http://') &&
                !URLs[e].indexOf('https://'))) {
                toggleError(`${e} should be a valid URL starting with http:// or https://!`);
                return true;
            }
        }
    }

    const editHandler = async (e) => {
        e.preventDefault();
        const ingredientsArray = ingredients.split(', ');
        const categoryImageURL = setCategoryImage(category);

        if (validate({ meal, ingredients, prepMethod, description, category },
            { foodImageURL, categoryImageURL })) return;

        const promise = await fetch(`http://localhost:8000/api/recipe/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                meal, ingredients: ingredientsArray, prepMethod, description,
                foodImageURL, category, categoryImageURL
            })
        });
        const data = await promise.json();
        // console.log(data);
        history.push('/');
    }

    return (<>
        <Header />
        <ErrorBox show={error.show} errorInfo={error.errorInfo}/>
        <form id="edit-form" className={`text-center p-5 ${styles['form-layout']}`} action="#" method="POST" id="edit-receipt-form">
            <p className="h4 mb-4">Edit Recipe</p>

            <input type="text" id="defaultRecepieEditMeal" name="meal" className="form-control mb-4" placeholder="Meal"
                defaultValue={recipe.meal} onChange={(e) => formsHandler(e, 'meal')} />

            <input type="text" id="defaultRecepieEditIngredients" name="ingredients" className="form-control mb-4"
                placeholder="Ingredients" defaultValue={[...recipe.ingredients].join(', ')}
                onChange={(e) => formsHandler(e, 'ingredients')} />

            <textarea type="text" id="defaultRecepieEditMethodOfPreparation" name="prepMethod" className={`form-control mb-4 ${styles['textarea']}`}
                onChange={(e) => formsHandler(e, 'prepMethod')} defaultValue={recipe.prepMethod}></textarea>

            <textarea type="text" id="defaultRecepieEditDescription" name="description" className={`form-control mb-4 ${styles['textarea']}`}
                placeholder="Description" defaultValue={recipe.description} onChange={(e) => formsHandler(e, 'description')}></textarea>

            <input type="text" id="defaultRecepieEditFoodImageURL" name="foodImageURL" className="form-control mb-4"
                placeholder="Food Image URL..." defaultValue={recipe.foodImageURL} onChange={(e) => formsHandler(e, 'foodImageURL')} />

            <select name="category" defaultValue={recipe.category} onChange={(e) => formsHandler(e, 'category')}>
                <option >Select category...</option>
                <option>Vegetables and legumes/beans</option>
                <option>Fruits</option>
                <option>Grain Food</option>
                <option>Milk, cheese, eggs and alternatives</option>
                <option>Lean meats and poultry, fish and alternatives</option>
            </select>
            <button className="btn btn-danger w-25 m-auto my-4 btn-block" type="submit"
                onClick={editHandler}>Edit it</button>

        </form><Footer /></>)
}

export default EditPage;