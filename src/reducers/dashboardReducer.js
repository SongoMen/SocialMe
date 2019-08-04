export default (state, action) => {
    switch (action.type) {
      case "load":
        return {
          load: action.payload
        };
      default:
        return state;
    }
  };