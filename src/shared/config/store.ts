import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer, { RootState } from '../reducers/index';

/*TODO: REMOVE THE MIDDLEWARE FROM initialize TO SEE WHAT ERROR YOU ARE GETTING */
// we have to add middleware for thunk as actionCreators return functions when called
// redux does not know how to handle it natively. so we need to use middleware for the same.
// redux throws below error if middleware is not added
// Error: Actions must be plain objects. Use custom middleware for async actions.
const defaultMiddlewares = [thunkMiddleware];
type MiddlewareType = Readonly<typeof defaultMiddlewares>;
const composedMiddlewares = (middlewares: MiddlewareType) =>
    compose(applyMiddleware(...defaultMiddlewares, ...middlewares));

const initialize = (initialState?: RootState, middlewares = []) => createStore(reducer, initialState, composedMiddlewares(middlewares));

export default initialize;