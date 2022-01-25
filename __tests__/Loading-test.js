/**
 * @format
 */

import 'react-native';
import React from 'react';
import { LoadingScreen } from '../components/loading';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<LoadingScreen />).toJSON();

  expect(tree).toMatchSnapshot();
});
