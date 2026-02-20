import { createStore, applyMiddleware, combineReducers, Middleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { IAppState, IItemState } from './types';
import { appReducer, initialAppState } from './reducers/app.reducer';
import { itemReducer, initialItemState } from './reducers/item.reducer';
import { environment } from 'src/environments/environment';

interface InitialState {
  app: IAppState;
  item: IItemState;
}

const configureStore = (initialState: InitialState) => {
  const middlewares: Middleware[] = [thunk];
  if (!environment.production) {
    middlewares.push(logger);
  }

  return createStore(
    combineReducers<InitialState>({
      app: appReducer,
      item: itemReducer,
    }),
    initialState,
    applyMiddleware(...middlewares)
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
