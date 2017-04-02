import 'react-native';
import React from 'react';
import ToDo from './../../../src/components/ToDo';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('Render CounterExample Component Correctly', () => {
    const tree = renderer.create(
        <ToDo toDos={{todos: []}} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
})