import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('tesing Notifications', () => {
    let wrapper;

	beforeEach(() => {
		wrapper = shallow(<App />);
	});

    it('test that App renders without crashing', () => {
		expect(wrapper.exists()).toBe(true);
	});

    it('verify that App renders a div with the class App-header', () => {
		expect(wrapper.find('.App-header').exists()).toBe(true);
	});

    it('verify that App renders a div with the class App-body', () => {
		expect(wrapper.find('.App-body').exists()).toBe(true);
	});

    it('verify that App renders a div with the class App-footer', () => {
		expect(wrapper.find('.App-footer').exists()).toBe(true);
	});
});
