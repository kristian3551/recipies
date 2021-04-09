import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Comment from './index';

describe('<Comment/>', function () {
    it('should render right things', function () {
        const component = renderer.create(<Comment comment={
            {
                createdAt: '01 Jan 1970 00:00:00 GMT',
                author: 'kristian01',
                content: 'asdasdasd'
            }
        } />);
        expect(component.toJSON()).toMatchSnapshot();
    });
})