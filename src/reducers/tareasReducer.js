export const tareasReducer = (state = [], action) => {
  switch (action?.type) {
    case "agregar":
      return [...state,action.payload];
    case "borrar":
      return state;
    case "tachar":
      return state;
    default:
      return state;
  }
}