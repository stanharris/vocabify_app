const initialState = {
  userProfile: {
    email: "",
    name: "",
    imageUrl: ""
  },
  isSignedIn: false
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN": {
      return {
        ...state,
        userProfile: action.profile,
        isSignedIn: true
      };
    }
    case "SIGN_OUT": {
      return initialState;
    }
    default:
      return state;
  }
};

export default auth;
