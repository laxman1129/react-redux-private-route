import { combineReducers } from 'redux';
import authentication, { AuthenticationState } from "./authentication";

export interface Action {
    type: string;
    payload?: any;
}

export interface RootState {
    readonly authentication: AuthenticationState;
}

const rootReducer = combineReducers<RootState>({
    authentication,
});

export default rootReducer;