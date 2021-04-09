import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import AuthContext from '../../AuthContext';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import CommentSection from '../../components/comment-section';

const DetailsPage = ({ match, history, location }) => {
    const [recipe, setRecipe] = useState({ ingredients: [],
         author: {}, description: 'default',
likes: [], comments: [] });
    const { user } = useContext(AuthContext);
    const id = match.params.id;

    useEffect(() => {
        const fetchData = async () => {
            const promise = await fetch(`http://localhost:8000/api/recipe/${id}`);
        const data = await promise.json();
        setRecipe(data);
        }
        fetchData();
    }, []);

    const isAuthor = user._id === recipe.author._id;

    const archiveHandler = async (e) => {
        await fetch(`http://localhost:8000/api/recipe/${id}`, {
            method: "DELETE"
        });
        history.push('/');
    }

    const likeHandler = async () => {
        if([...recipe.likes].find(e => e._id === user._id)) return;
        await fetch(`http://localhost:8000/api/recipe/${id}/like`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user })
        });
        window.location.reload();
        
    }
    console.log(recipe);
    return (<>
        <Header />
        <div className={`row ${styles['form-layout']} p-5`}>
            <div className="col-md-12">
                <div className={`${styles['recepieInfo']}`}>
                    <div className={styles["detailsFoodImage"]}>
                        <img src={recipe.foodImageURL}
                            alt="" />
                    </div>

                    <div className={styles.infoPack}>
                        <h3 className="my-3">{recipe.meal}</h3>
                        <p className={styles['prep-method']}>{recipe.prepMethod}</p>
                        {recipe.description.split('/n').map((e,i) => {
                            return <p key={i} className={styles.description}>{e}</p>
                        })}
                    </div>
                    <i>* It is your article, so you can modify the recipe.</i>
                    <div className={styles.actions}>

                        {isAuthor ? (<>
                            <Link className="btn btn-danger" style={{marginRight: '10px'}} onClick={archiveHandler}>Delete</Link>
                            <Link className="btn btn-info" to={`/edit/${id}`}>Edit</Link></>)
                            : (<Link className="btn btn-success" onClick={likeHandler}>
                                {[...recipe.likes].find(e => e._id === user._id) ? 
                                `You ${[...recipe.likes].length === 1 ? '' : `and ${recipe.likes.length - 1}`} liked the recipe` : 
                                (`Like recipe! ${recipe.likes.length} people have done it!`)}</Link>)}
                    <hr/>
                    <h3 style={{margin: '20px'}}>Comment section</h3>
                    <CommentSection comments={recipe.comments} id={recipe._id}/>
                    </div>
                    
                </div>

                <div className={styles['detailsIngredients']}>
                    <h3 className={`my-3 ${styles.ingredient}`}>Ingredients</h3>
                    <ul>
                        {[...recipe.ingredients].map((e, i) => {
                            return <li key={i}>{e}</li>
                        })}
                    </ul>
                </div>
            </div>
        </div>
        <Footer />
    </>
    );
}

export default DetailsPage;