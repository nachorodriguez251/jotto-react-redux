import moxios from 'moxios';
import { storeFactory } from '../../test/testUtils';
import { getSecretWord } from '.';

/**
 * ASYNC ACTION CREATOR TESTING:
 * 1. create a store with initial state
 * 2. dispatch action creator using store.dispatch()
 *    -store.dispatch() returns promise
 *    -check state in .then() callback
 * 3. be careful to see the tests fail before writing the code
 * 4. if they don't, likely did not return store.dispatch() promise
 */

/**
 * MOXIOS:
 * 1. configures axios adapter to moxios instead of http
 * 2. axios sends requests to moxios
 * 3. write moxios response to mimic server response
 * 
 *  test -> actionCreator -> axios <-> moxios
 */

describe('getSecretWord action creator', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('adds response word to state', () => {
    const secretWord = 'party';
    const store = storeFactory();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: secretWord,
      });
    });

    // need to return the store.dispatch promise 
    // if not, the test will complete before the 
    // promise resolves and the test will never fail 
    return store.dispatch(getSecretWord())
      .then(() => {
        const newState = store.getState();
        expect(newState.secretWord).toBe(secretWord);
      })
  });
})