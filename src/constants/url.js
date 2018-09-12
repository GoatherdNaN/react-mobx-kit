import { METHOD } from './config';

const commonUrlFrag = 'http://localhost:3000'; // 自定义通用前缀
const getApi = (url, method = METHOD.GET) => ({ url: commonUrlFrag + url, method });

export const LIST = getApi('/list');
