import React from 'react';
import renderer from 'react-test-renderer';
import Footer from './index';

describe('<Footer/>', () => {
    it('should render properly', () => {
        const component = renderer.create(<Footer/>);
        const node = component.toJSON();
        expect(node).toMatchSnapshot();
    });
})