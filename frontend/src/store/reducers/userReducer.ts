import { SAVE_USER_INFO } from '../actions/userAction';

interface UserState {
  token: string;
  lastname: string;
  firstname: string;
  username: string;
}

const initialState: UserState = {
  token: '',
  lastname: '',
  firstname: '',
  username: '',
};

export const userReducer = (state = initialState, action: any) => {
  if (action.type === SAVE_USER_INFO) {
    return action.payload;
  }
  return state;
};
