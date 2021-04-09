import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

const Recipe = ({ id, recipe }) => {
    
    return (
    <div className="container">
    <div className="row">
        <div className="col-lg-12">
            <div className={styles['our-team-main']}>

                <div className={styles['team-front']}>
                    <img
                        src={recipe.categoryImageURL} alt="Category"/>
                    <h3>{recipe.meal}</h3>
                    <p>{recipe.category}</p>
                </div>

                <div className={styles['team-back']}>
                    <div className={styles['back-side-info']}>
                    <h4>Details</h4>
                    <Link to={`/details/${id}`}>View the recipe</Link>
                        <h4>Ingredients</h4>
                        <ul style={{listStyleType: 'none'}}>
                            {[...recipe.ingredients].map((e,i) => {
                                return <li key={i}>{e}</li>;
                            })}
                        </ul>
                        
                    </div>

                    <img className={styles['foodImage']}
                        src={recipe.foodImageURL} alt="Food"/>
                </div>

            </div>
        </div>
    </div>
</div>
)
}

export default Recipe;