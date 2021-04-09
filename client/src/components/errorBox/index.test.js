import React from 'react';
import renderer from 'react-test-renderer';
import ErrorBox from './index';

describe('<ErrorBox/>', () => {
    it('should render properly', () => {
        const component = renderer.create(<ErrorBox show={true} errorInfo={'Some error info!'}/>)
        const node = component.toJSON();
        expect(node).toMatchSnapshot();
    });
})