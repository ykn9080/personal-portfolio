// import { applyMiddleware, createStore, compose } from "redux";
// import { createWrapper } from "next-redux-wrapper";
// import { composeWithDevTools } from "redux-devtools-extension";
// import reducer from "./modules";

// const configureStore = () => {
//   const middlewares = ["YOUR_MIDDLEWARES"];
//   const enhancer =
//     process.env.NODE_ENV === "production"
//       ? compose(applyMiddleware(...middlewares))
//       : composeWithDevTools(applyMiddleware(...middlewares));
//   const store = createStore(reducer, enhancer);
//   return store;
// };

// const wrapper = createWrapper(configureStore, {
//   debug: process.env.NODE_ENV !== "production"
// });

// export default wrapper;
