import React from 'react';
import { shallow } from 'enzyme';

import App, { UnconnectedApp } from './App';
import { storeFactory, findByTestAttr } from '../test/testUtils';

const setup = (state={}) => {
  const store = storeFactory(state);
  const wrapper = shallow(<App store={store} />).dive().dive();
  return wrapper;
}

describe('render', () => {
  test('renders component without error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-app');
    expect(component.length).toBe(1);
  });
});

describe('redux properties', () => {
  test('has access to `success` state', () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });

  test('has access to `secretWord` state', () => {
    const secretWord = 'party';
    const wrapper = setup({ secretWord });
    const secretWordProp = wrapper.instance().props.secretWord;
    expect(secretWordProp).toBe(secretWord);
  });

  test('has access to `guessedWords` state', () => {
    const guessedWords = [{ guessedWord: 'train', letterMatchCount: 3 }];
    const wrapper = setup({ guessedWords });
    const guessedWordsProp = wrapper.instance().props.guessedWords;
    expect(guessedWordsProp).toEqual(guessedWords);
  });

  test('`getSecretWord` action creator is a function on the props', () => {
    const wrapper = setup();
    const getSecretWordProp = wrapper.instance().props.getSecretWord;
    expect(getSecretWordProp).toBeInstanceOf(Function);
  });
});

  test('`getSecretWord` runs on App mount', () => {
    // with this mock we can check how many times it was called
    const getSecretWordMock = jest.fn();


    // we pass the mock created as prop, to be called in componentDidMount()
    const wrapper = shallow(<UnconnectedApp getSecretWord = {getSecretWordMock} />);

    // call the life cycle method on the instance created with shallow
    wrapper.instance().componentDidMount();

    // get how many times the mock was called
    const getSecretWordMockCalls = getSecretWordMock.mock.calls.length;

    // expected the mock to be called 1 time
    expect(getSecretWordMockCalls).toBe(1);
  })