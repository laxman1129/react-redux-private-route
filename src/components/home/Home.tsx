import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Redirect } from "react-router-dom";
import { RootState } from "../../shared/reducers";

/****************************************************************************************************/
// map state to the props of the component
const mapStateToProps = ({ authentication }: RootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  loginError: authentication.loginError,
  isAdmin: authentication.account.authorities.includes("ROLE_ADMIN"),
  isUser: authentication.account.authorities.includes("ROLE_USER"),
});
//****************************************************************************************************/

// map axrions to be dispatched to the props of the component
const mapDispatchToProps = {};
//****************************************************************************************************/

// used to connect the selected part of state and actions to be dispatched to store
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type HomeProps = PropsFromRedux & {};

const Home = (props: HomeProps) => {
  if (props.isAuthenticated && props.isAdmin) {
    // if the logged in user has admin access then redirect to admin page
    return <Redirect to="/admin" />;
  } else if (props.isAuthenticated && props.isUser) {
    // if the logged in user has user access then redirect to user page
    return <Redirect to="/user" />;
  } else {
    // redirect to root page
    return <Redirect to="/" />;
  }
};

export default connector(Home);
