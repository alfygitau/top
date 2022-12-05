import { useMemo } from "react";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

import rootReducer from "./reducers/index";

const MIDDLEWARES = [];

process.env.NODE_ENV === "development" &&
  typeof window !== "undefined" &&
  MIDDLEWARES.push(logger);

let state;

const buildStore = (preloadedState) =>
  createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...MIDDLEWARES))
  );

export const initializeStore = (preloadedState) => {
  let _store = state ?? buildStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && state) {
    _store = buildStore({
      ...state.getState(),
      ...preloadedState,
    });
    // Reset the current store
    state = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!state) state = _store;

  return _store;
};

export const useStore = (initialState) => {
  return useMemo(() => initializeStore(initialState), [initialState]);
};
