import withErrorHandel from './withErrorHandler';
import Fallback from './Fallback';
import errorCallback from './errorCallback';

// HOC
export default withErrorHandel(errorCallback, Fallback);