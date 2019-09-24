import React from 'react';
import renderer from 'react-test-renderer';
import { TThin } from '../index'
// import { TextInput } from 'react-native'
import 'jest-styled-components'

test('renders correctly', () => {
  const component = renderer.create(<TThin />).toJSON();
  expect(component).toMatchSnapshot();
});