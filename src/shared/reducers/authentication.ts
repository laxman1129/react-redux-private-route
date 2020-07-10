import { LoginModel } from '../model/Login.model';
import { Dispatch } from 'react';
import { Action } from './index';
export const ACTION_TYPES = {
    LOGIN: 'authentication/LOGIN',
    GET_SESSION: 'authentication/GET_SESSION',
}
const initialState = {
    loading: false,
    isAuthenticated: false,
    loginSuccess: false,
    loginError: false, // Errors returned from server side
    showModalLogin: false,
    account: {} as any,
    errorMessage: (null as unknown) as string, // Errors returned from server side
    redirectMessage: (null as unknown) as string,
    sessionHasBeenFetched: false,
    idToken: (null as unknown) as string,
    logoutUrl: (null as unknown) as string,
};

export type AuthenticationState = Readonly<typeof initialState>;

//reducer
export default (state: AuthenticationState = initialState, action: Action): AuthenticationState => {
    switch (action.type) {
        case ACTION_TYPES.LOGIN:
            return {
                ...state,
                isAuthenticated: action.payload,
                sessionHasBeenFetched: true,
                account: {
                    authorities: [action.payload],
                }
            }
        case ACTION_TYPES.GET_SESSION:
            //Dummy implementation
            const hasAnyAuthorities = ['ROLE_ADMIN', 'ROLE_USER']
            return {
                ...state,
                loginSuccess: hasAnyAuthorities.some((auth) => state.account.authorities.includes(auth))
            }
    }
    return state;
}

// action creator
export const login: (loginModel: LoginModel) => void = (loginModel) => async (dispatch: Dispatch<Action>) => {
    //dispatch action
    await dispatch({
        type: ACTION_TYPES.LOGIN,
        payload: dummyCallToAPIForAuthentication(loginModel) // call api to authenticate
    });
    getSession(dispatch);
}

const dummyCallToAPIForAuthentication = (loginModel: LoginModel) => {
    if (loginModel.username === 'admin') {
        return 'ROLE_ADMIN';
    } else if (loginModel.username === 'user') {
        return 'ROLE_USER';
    } else {
        return '';
    }
}



const getSession = (dispatch: Dispatch<Action>) => {
    // dispatch action
    dispatch({
        type: ACTION_TYPES.GET_SESSION,
        payload: "" // call api to authenticate
    });
}

