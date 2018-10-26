import { check } from './CheckPermissions'

const AuthComponent = ({code, children}) => code && check(code) ? children : null;

export default AuthComponent;
