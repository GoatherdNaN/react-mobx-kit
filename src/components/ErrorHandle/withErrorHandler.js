/**
 * componentDidCatch: render()函数抛出错误，则会触发该函数
 * 注意：错误在渲染阶段中被捕获，但在事件处理程序中不会被捕获。
 */
import React from 'react'
import curry from '../../utils/curry'

const withErrorHandler =  (errorCallback, FallbackComponent, Component) => {
  class ErrorHandler extends React.Component {
    state = {
      hasError: false,
      error: null,
      errorInfo: null
    };

    componentDidCatch (error, info) {
      console.log('捕获子层的错误');
      this.setState({ hasError: true, error, errorInfo: info });

      errorCallback(error, info, this.props);
    };

    render () {
      if (this.state.hasError) {
        const { error, errorInfo } = this.state
        return (
          <FallbackComponent
            {...this.props}
            error={error}
            errorInfo={errorInfo}
          />
        )
      }

      return <Component {...this.props} />
    }
  }
  console.log('/displayName',Component.displayName);
  ErrorHandler.displayName = `withErrorHandler(${Component.displayName || 'Component'})`;
  return ErrorHandler;
}

export default curry(withErrorHandler);