/**
 * @format
 */

import 'react-native';
import React from 'react';
import { FollowScreen } from '../components/follow';
import CONSTANTS from '../constants';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { api } from '../api';

beforeEach(() => {
  fetch.resetMocks();
});

it ('invalid response', () => {
  fetch.mockResponseOnce(JSON.stringify({id:1}));
  const nav = { navigate: jest.fn() };
  var ext;
  try {
    ext = api('posts');
  } catch (e) {
    console.log(e);
  }

  const tree = renderer
    .create(<FollowScreen navigation = {nav} extra = {ext} />).toJSON();

  expect(tree).toMatchSnapshot();
})

it ('empty response', () => {
  const nav = { navigate: jest.fn() };
  var ext;
  ext = {};
  const tree = renderer
    .create(<FollowScreen navigation = {nav} extra = {ext} />).toJSON();

  expect(tree).toMatchSnapshot();
});


it('renders correctly', () => {
  const nav = { navigate: jest.fn() };
  const ext = CONSTANTS.ARR;
  const tree = renderer
    .create(<FollowScreen navigation = {nav} extra = {ext} />).toJSON();

  expect(tree).toMatchSnapshot();
});
