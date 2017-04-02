import 'react-native';
import React from 'react';
import Counter from './../../../src/components/Counter';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('Render CounterExample Component Correctly', () => {
    const tree = renderer.create(
        <Counter number={0} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
})
