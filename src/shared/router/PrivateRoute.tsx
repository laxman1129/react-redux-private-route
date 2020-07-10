import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { RootState } from "../reducers";

interface OwnProps extends RouteProps {
  hasAnyAuthorities?: string[];
}

export interface PrivateRouteProps extends OwnProps, StateProps {}

const PrivateRoute = (
  // props object destructuring
  {
    component: Component, // this is inherited from RouteProps
    isAuthenticated, // this is obtained from StateProps
    sessionHasBeenFetched, // this is obtained from StateProps
    isAuthorized, // this is obtained from StateProps
    hasAnyAuthorities = [], // this is obtained from OwnProps
    ...rest // rest of the parameters passed in the component
  }: PrivateRouteProps
) => {
  /*
   * if the session is not fetched then return empty element
   * if authenticated and authorized then renders the authorised component
   * else redirect to login page
   */
  const renderRedirect = (props: any) => {
    if (!sessionHasBeenFetched) {
      return <div>No session fetched</div>;
    } else {
      return isAuthenticated ? (
        // Component! makes sure that the component is not undefined
        checkAuthorities(Component!, isAuthorized, props)
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            search: props.location.search,
            state: { from: props.location },
          }}
        />
      );
    }
  };

  /*if the component is undefined then throw error*/

  if (!Component)
    throw new Error(
      `A component needs to be specified for private route for path ${
        (rest as any).path
      }`
    );

  /*dynamic route */
  return <Route {...rest} render={renderRedirect} />;
};

/**
 * This method checks if the user is authorized to access this route
 *
 * @param authorities : authorities obtained from the server
 * @param hasAnyAuthorities : authorities needed to access the component
 */
export const hasAnyAuthority = (
  authorities: string[],
  hasAnyAuthorities: string[]
) => {
  console.log('====================================');
  console.log(authorities);
  console.log(hasAnyAuthorities);
  console.log('====================================');
  if (authorities && authorities.length !== 0) {
    if (hasAnyAuthorities.length === 0) {
      return true;
    }
    return hasAnyAuthorities.some((auth) => authorities.includes(auth));
  }
  return false;
};

const checkAuthorities = (
  Component: React.ComponentType<any> | React.ComponentType<any>,
  isAuthorized: boolean,
  props: any
) => {
  return isAuthorized ? (
    <Component {...props} />
  ) : (
    <div className="insufficient-authority">
      <div className="alert alert-danger">
        You are not authorized to access this page.
      </div>
    </div>
  );
};

// maps the state to the props of the component
const mapStateToProps = (
  /*the state from the store */
  {
    authentication: { isAuthenticated, account, sessionHasBeenFetched },
  }: RootState,
  { hasAnyAuthorities = [] }: OwnProps
) =>
  /*the props of the component*/
  ({
    isAuthenticated,
    isAuthorized: hasAnyAuthority(account.authorities, hasAnyAuthorities),
    sessionHasBeenFetched,
  });

/*the state mapped to the props */
type StateProps = ReturnType<typeof mapStateToProps>;

/* connect function from react-redux, connects the props created using mapStateToProps to the component. */
export default connect(mapStateToProps, null, null, { pure: false })(
  PrivateRoute
);
