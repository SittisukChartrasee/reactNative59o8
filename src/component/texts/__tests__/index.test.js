import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components/native'
import {
  TThin,
  TText,
  TMed,
  TLight,
  TBold,
  TSemiBold,
} from '../index'

it('renders TThin', () => {
  const tree = renderer.create(<TThin />).toJSON()
  expect(tree).toMatchSnapshot()
  renderer.create(<TThin />)
})
it('renders TText', () => {
  const tree = renderer.create(<TText />).toJSON()
  expect(tree).toMatchSnapshot()
  renderer.create(<TText />)
})
it('renders TMed', () => {
  const tree = renderer.create(<TMed />).toJSON()
  expect(tree).toMatchSnapshot()
  renderer.create(<TMed />)
})
it('renders TLight', () => {
  const tree = renderer.create(<TLight />).toJSON()
  expect(tree).toMatchSnapshot()
  renderer.create(<TLight />)
})
it('renders TBold', () => {
  const tree = renderer.create(<TBold />).toJSON()
  expect(tree).toMatchSnapshot()
  renderer.create(<TBold />)
})
it('renders TSemiBold', () => {
  const tree = renderer.create(<TSemiBold />).toJSON()
  expect(tree).toMatchSnapshot()
  renderer.create(<TSemiBold />)
})