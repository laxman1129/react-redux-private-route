import { AuthenticationState } from "./authentication";


export interface RootState {
    readonly authentication: AuthenticationState;
}