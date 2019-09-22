import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';
import MenuComponent from '../components/Menu';

configure({ adapter: new Adapter() });


describe('Menu Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <MenuComponent />,
    );
  });

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('contains main intro div', () => {
    const div = wrapper.find('div');
    expect(div).toHaveLength(3);
  });
  it('contains main buttons', () => {
    const button = wrapper.find('button');
    expect(button).toHaveLength(1);
  });

  it('Render menu items', () => {
    const button = wrapper.find('button');
    wrapper.setState({
      imageClassname: 'show-menu',
    });
    wrapper.instance().animateMenu();
    expect(button).toHaveLength(1);
  });
  it('contains main buttons', () => {
    const div = wrapper.find('.fadetext');
    expect(div).toHaveLength(1);
  });
});
