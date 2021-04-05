import { GET_BOOKS, LOGIN_SUCCESS, LOG_OUT } from './action/actionTypes';

const reducer = (state = [], action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };

    case LOG_OUT:
      return {
        ...state,
        user: action.payload,
      };

    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
