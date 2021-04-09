import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import RecipeCard from './index';

describe('<RecipeCard/>', () => {
    it('should render properly', () => {
        const component = renderer.create(
        <BrowserRouter>
        <RecipeCard recipe={{
            "ingredients": [
              "1 medium onion",
              "chopped",
              "1 can (4 ounces) sliced mushrooms",
              "drained",
              "2 tablespoons butter",
              "3 cups water",
              "2 cups chicken broth",
              "1 package (6 ounces) long grain and wild rice mix",
              "2 cups diced cooked turkey",
              "1 cup heavy whipping cream",
              "Minced fresh parsley"
            ],
            "likes": [
              {
                "recipes": [],
                "_id": "60572833e40d0f4330d412e6",
                "username": "vasil46",
                "password": "$2b$10$HoA1cOXkvWqJPRAD/LNWtesJFAyaYKY3F4/R8CR4gcXxZ6X1aCofG",
                "firstName": "Vasil",
                "lastName": "Todorov",
                "__v": 0
              },
              {
                "recipes": [],
                "_id": "6070118ba9e9c50e20f433a7",
                "username": "snejii69",
                "password": "$2b$10$HYEyABpHvMv7Sups1oF9keLB6czPhuJifr7Jbn7jQaiTuwY8L968u",
                "firstName": "Snejana",
                "lastName": "Todorova",
                "__v": 0
              },
              {
                "recipes": [],
                "_id": "6070118ba9e9c50e20f433a7",
                "username": "snejii69",
                "password": "$2b$10$HYEyABpHvMv7Sups1oF9keLB6czPhuJifr7Jbn7jQaiTuwY8L968u",
                "firstName": "Snejana",
                "lastName": "Todorova",
                "__v": 0
              },
              {
                "recipes": [],
                "_id": "6070131eec67292e3486be68",
                "username": "dimo89",
                "password": "$2b$10$RSJpSQOgb0JVaeleGfbyzeLy6H7ngyEN5NIRMG1szeik3slDUXNo2",
                "firstName": "Dimitar",
                "lastName": "Dimitrov",
                "__v": 0
              }
            ],
            "comments": [
              {
                "createdAt": "2021-04-09T06:10:11.734Z",
                "_id": "60700e33a9e9c50e20f433a6",
                "content": "I enjoyed this recipe!",
                "author": "kristian01",
                "__v": 0
              }
            ],
            "_id": "60700e0ba9e9c50e20f433a5",
            "meal": "Cream of Turkey and Wild Rice Soup",
            "prepMethod": "In a large saucepan, saute onion and mushrooms in butter until onion is tender. Add water, broth and rice mix with seasoning; bring to a boil. Reduce heat; simmer for 20-25 minutes or until rice is tender. Stir in turkey and cream; heat through. Sprinkle with parsley.",
            "description": "Nutrition Facts/n\n1 cup: 364 calories, 21g fat (12g saturated fat), 100mg cholesterol, 857mg sodium, 25g carbohydrate (3g sugars, 1g fiber), 19g protein.",
            "foodImageURL": "https://www.tasteofhome.com/wp-content/uploads/2018/01/Cream-of-Turkey-and-Wild-Rice-Soup_EXPS_TOHON19_3589_B06_12_5b-2.jpg?fit=696,1024",
            "category": "Milk, cheese, eggs and alternatives",
            "categoryImageURL": "https://media.wsimag.com/attachments/e93e9eb9c2850d7ffe69d0383ed27baf224eafd3/store/fill/690/388/35defd11ef8de6b2a0af60645188fd44f1fdcc1e7ed397421e56f58cd7c7/Eggs-milk-and-cheese.jpg",
            "author": {
              "recipes": [
                "605714970473e830dc15e6b8",
                "60571c450473e830dc15e6b9",
                "60572435e40d0f4330d412e3",
                "60572460e40d0f4330d412e4",
                "6057254be40d0f4330d412e5",
                "606b142d3b22b739a06ca43a",
                "60700e0ba9e9c50e20f433a5"
              ],
              "_id": "6057036a8907923380703d86",
              "username": "kristian01",
              "password": "$2b$10$c.FirmvuuplSoklM2zaWnesQfZm8LcHn7JF.86RSelxkO3HepfQfu",
              "firstName": "Kristian",
              "lastName": "Todorov",
              "__v": 0
            },
            "__v": 0
          }}/>
           </BrowserRouter>);
        const node = component.toJSON();
        expect(node).toMatchSnapshot();
    })
})