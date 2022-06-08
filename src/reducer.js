export const initialState = {
  user: null,
  theme: "",
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_THEME: "SET_THEME",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_THEME:
      return {
        ...state,
        theme: action.theme,
      };

    default:
      return state;
  }
};

export default reducer;
