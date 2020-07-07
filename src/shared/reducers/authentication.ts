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