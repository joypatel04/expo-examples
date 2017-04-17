import 'react-native';
import React from 'react';
import BarCodeScanner from './../../../src/components/BarCodeScanner';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('Render BarCodeScanner Component Correctly', () => {
  const tree = renderer.create(
    <BarCodeScanner width={100} onToggleModal={() => {}} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})