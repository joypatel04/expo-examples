import 'react-native';
import React from 'react';
import CounterExample from './../../../src/components/CounterExample';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('Render CounterExample Component Correctly', () => {
    const tree = renderer.create(
        <CounterExample number={0} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
})
