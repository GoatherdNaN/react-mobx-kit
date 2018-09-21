const errorCallback = (...rest) => {
  // 真实开发可以在这给服务器发送错误的相关报告
  console.log('errorReport',rest);
}

export default errorCallback;