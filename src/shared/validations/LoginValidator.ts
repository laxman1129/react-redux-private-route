import { LoginModel } from '../model/Login.model';
import Validator from './Validator'

class LoginValidator implements Validator {

    onValidate = (loginModel: LoginModel) => {
        const username = (loginModel && new RegExp(/[aA-zZ]$/).test(loginModel.username));
        const password = (loginModel && new RegExp(/[aA-zZ0-9]$/).test(loginModel.password));
        return (username && password);
    }
}

export default LoginValidator;
