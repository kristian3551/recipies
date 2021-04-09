import React from 'react';
import renderer from 'react-test-renderer';
import CommentSection from './index';

describe('<CommentSection/>', () => {
    it('should render right things', () => {
        const component = renderer.create(<CommentSection comments={
            [{
                "createdAt": "2021-04-09T06:10:11.734Z",
                "_id": "60700e33a9e9c50e20f433a6",
                "content": "I enjoyed this recipe!",
                "author": "kristian01",
                "__v": 0
              }, {
                "createdAt": "2021-04-09T06:10:11.734Z",
                "_id": "60700e33a9e9c50e20f433a6",
                "content": "I enjoyed this recipe!",
                "author": "kristian01",
                "__v": 0
              }]
        }/>);
        expect(component.toJSON()).toMatchSnapshot();
    })
});

