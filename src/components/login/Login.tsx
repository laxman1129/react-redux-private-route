import React, { useState, ChangeEvent, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../../shared/reducers";
import { login } from "../../shared/reducers/authentication";

import css from "./Login.module.css";
import LoginValidator from "../../shared/validations/LoginValidator";
import { LoginModel } from "../../shared/model/Login.model";

//****************************************************************************************************/
// map state to the props of the component
const mapStateToProps = ({ authentication }: RootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  loginError: authentication.loginError,
  showModal: authentication.showModalLogin,
  loginSuccess: authentication.loginSuccess,
});
//****************************************************************************************************/

// map axrions to be dispatched to the props of the component
const mapDispatchToProps = {
  login,
};
//****************************************************************************************************/

// used to connect the selected part of state and actions to be dispatched to store
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type LoginProps = PropsFromRedux & {};
//****************************************************************************************************/

/**
 * Login Component
 *
 * @param props
 */
const Login = (props: LoginProps) => {
  // History hook from router
  const history = useHistory();
  //****************************************************************************************************/

  // controlled component start
  const [loginModel, setLoginModel] = useState<LoginModel>({
    username: "",
    password: "",
  });

  const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginModel({ ...loginModel, username: event.target.value });
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginModel({ ...loginModel, password: event.target.value });
  };
  // controlled component end
  //****************************************************************************************************/

  // event handling start
  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (new LoginValidator().onValidate(loginModel)) {
      props.login(loginModel);
    } else {
      alert("ERROR WHILE LOGGING IN");
    }
  };
  // event handling end
  //****************************************************************************************************/

  // render side effects start
  useEffect(() => {
    if (props.isAuthenticated && props.loginSuccess) {
      // if authenticated then redirect to home page
      history.push("/home");
    }
  }, [props.isAuthenticated, props.loginSuccess, history]);
  // render side effects start
  //****************************************************************************************************/

  return (
    <div className={css.container}>
      <main className={css.containt}>
        <form className={css.login}>
          <h1>Sign In</h1>
          <label htmlFor="username" className={css.formdata}>
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleUsername}
            className={css.formdata}
          />
          <label htmlFor="password" className={css.formdata}>
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handlePassword}
            className={css.formdata}
          />
          <button type="submit" className={css.formdata} onClick={handleLogin}>
            Sign In
          </button>
        </form>
      </main>
    </div>
  );
};

// connect the component to the store
export default connector(Login);
