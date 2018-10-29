import checkPermissions from './CheckPermissions'

const AuthComponent = ({code, children}) => code && checkPermissions(code) ? children : null;

export default AuthComponent;
