import React, { useContext, useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../AuthContext';
import setCategoryImage from '../../utils/setCategoryImage';
import ErrorBox from '../../components/errorBox';
import styles from './index.module.css';

const CreatePage = () => {
    const [meal, setMeal] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [prepMethod, setPrepMethod] = useState('');
    const [description, setDescription] = useState('');
    const [foodImageURL, setFoodImageURL] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState({ show: false, errorInfo: ''});
    const history = useHistory();
    const { user } = useContext(AuthContext);

    const toggleError = (errorInfo) => {
        setError({ show: true, errorInfo });
        setTimeout(() => {
            setError({ show: false, errorInfo: '' })
        }, 5000);
    }

    const formsHandler = (e, type) => {
        const value = e.target.value;
        if (type === 'meal') setMeal(value);
        else if (type === 'ingredients') setIngredients(value);
        else if (type === 'prepMethod') setPrepMethod(value);
        else if (type === 'description') setDescription(value);
        else if (type === 'foodImageURL') setFoodImageURL(value);
        else if (type === 'category') setCategory(value);
    }

    const validate = ( strings, URLs) => {
        for( const e in strings) {
            if(strings[e].length === 0) {
                toggleError(`${e} should be a non-empty string!`);
                return true;
            }
        }
        for( const e in URLs) {
            if(URLs[e].length === 0 || (!URLs[e].indexOf('http://')
            && !URLs[e].indexOf('https://'))) {
                toggleError(`${e} should be a valid URL starting with http:// or https://!`);
                return true;
            }
        }
    }

    const shareHandler = async (e) => {
        e.preventDefault();
        // console.log(meal, ingredients, prepMethod, description, foodImageURL, category);
        const ingredientsArray = ingredients.split(', ');
        const categoryImageURL = setCategoryImage(category);

        if(validate({ meal, ingredients, prepMethod, description, category},
            { foodImageURL, categoryImageURL})) return;

        await fetch('http://localhost:8000/api/recipe', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                meal, ingredients: ingredientsArray, prepMethod, description,
                foodImageURL, category, categoryImageURL, author: user._id
            })
        });
        // const data = await promise.json();
        // console.log(data);
        history.push('/');
    };
    

    return (<>
        <Header />
        <ErrorBox show={error.show} errorInfo={error.errorInfo}/>
        <form id="create-form" className={`text-center p-5 ${styles['form-layout']} ${styles['share-receipt-form']}`} action="#" method="POST">
            <p className="h4 mb-4">Share Recipe</p>

            <input type="text" id="defaultRecepieShareMeal" name="meal" className="form-control mb-4" placeholder="Meal"
                onChange={(e) => formsHandler(e, 'meal')} />

            <input type="text" id="defaultRecepieShareIngredients" name="ingredients" className="form-control mb-4"
                placeholder="Ingredients (separated by ', ')" onChange={(e) => formsHandler(e, 'ingredients')} />

            <textarea type="text" id="defaultRecepieShareMethodOfPreparation" name="prepMethod"
                className={`form-control mb-4 ${styles.textarea}`} placeholder="Method of preparation"
                onChange={(e) => formsHandler(e, 'prepMethod')}></textarea>

            <textarea type="text" id="defaultRecepieShareDescription" name="description" className={`form-control mb-4 ${styles.textarea}`}
                placeholder="Description" onChange={(e) => formsHandler(e, 'description')}></textarea>

            <input type="text" id="defaultRecepieShareFoodImageURL" name="foodImageURL" className="form-control mb-4"
                placeholder="Food Image URL..." onChange={(e) => formsHandler(e, 'foodImageURL')} />

            <select name="category" onChange={(e) => formsHandler(e, 'category')}>
                <option defaultValue>Select category...</option>
                <option defaultValue>Vegetables and legumes/beans</option>
                <option defaultValue>Fruits</option>
                <option defaultValue>Grain Food</option>
                <option defaultValue>Milk, cheese, eggs and alternatives</option>
                <option defaultValue>Lean meats and poultry, fish and alternatives</option>
            </select>

            <button className="btn btn-danger w-25 m-auto my-4 btn-block" type="submit"
                onClick={shareHandler}>Share it</button>
        </form>
        <Footer />
    </>)
}

export default CreatePage;