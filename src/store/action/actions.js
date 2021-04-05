import { LOGIN_SUCCESS, LOG_OUT, GET_BOOKS } from './actionTypes';

export const loginSuccessAction = (user, token) => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    },
  };
};

export const logOutAction = () => {
  return {
    type: LOG_OUT,
    payload: null,
  };
};

export const getBooksAction = (books) => {
  return {
    type: GET_BOOKS,
    payload: books,
  };
};
