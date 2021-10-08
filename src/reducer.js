export const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, user: action.user };
    // return { ...state, isAuthenticated: true };
    case "logout":
      return { ...state, user: null };
    // return { ...state, isAuthenticated: false };

    default:
      throw new Error("Nie ma takiej akcji: " + action.type);
  }
};

export const initialState = {
  user: JSON.parse(window.localStorage.getItem("token-data")) ?? null,
  // isAuthenticated: false,
};
