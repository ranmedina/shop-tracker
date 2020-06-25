import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { IAppState, IItemState } from './types';
import { appReducer, initialAppState } from './reducers/app.reducer';
import { itemReducer, initialItemState } from './reducers/item.reducer';

interface InitialState {
  app: IAppState;
  item: IItemState;
}

const configureStore = (initialState: InitialState) => {
  return createStore(
    combineReducers<InitialState>({
      app: appReducer,
      item: itemReducer,
    }),
    initialState,
    applyMiddleware(thunk, logger)
  );
};

export const appStore = configureStore({
  app: {
    ...initialAppState,
  },
  item: {
    ...initialItemState,
  },
});
