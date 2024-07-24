import { createStore } from "redux";
import { Provider } from "react-redux";

const initialState = {
  isAuthenticated: false,
  user: null,
  patients: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        patients: action.payload.patients,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

const store = createStore(reducer);

export { store, Provider };
