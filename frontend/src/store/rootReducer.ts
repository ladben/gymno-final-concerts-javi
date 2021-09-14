import { RootStateOrAny } from 'react-redux';
import { AnyAction, combineReducers } from 'redux';

// import reducers

const appReducer = combineReducers({
  // user: userReducer,
});

const rootReducer = (state: RootStateOrAny | undefined, action: AnyAction) => {
  if (action.type === 'USER_LOGGED_OUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
