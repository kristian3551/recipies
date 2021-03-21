import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Recipe = ({ id, recipe }) => {
    
    return (
    <div className="container">
    <div className="row">
        <div className="col-lg-12">
            <div className="our-team-main">

                <div className="team-front">
                    <img
                        src={recipe.categoryImageURL} />
                    <h3>{recipe.meal}</h3>
                    <p>{recipe.category}</p>
                </div>

                <div className="team-back">
                    <div className="back-side-info">
                    <h4>Details</h4>
                    <Link to={`/details/${id}`}>View the recipe</Link>
                        <h4>Ingredients</h4>
                        <ul>
                            {[...recipe.ingredients].map((e,i) => {
                                return <li key={i}>{e}</li>;
                            })}
                        </ul>
                        
                    </div>

                    <img className="foodImage"
                        src={recipe.foodImageURL} />
                </div>

            </div>
        </div>
    </div>
</div>
)
}

export default Recipe;