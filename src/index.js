import request from './ajax'

const simplifyMiddleware = options => store => next => action => {
  // init configObject
  const {
    url,
    types = [null, null, null]
  } = action
  /**
     * 以url为非标准action唯一依据
     * 标准action进入下一个中间件
     */
  if (!url) {
    next(action)
    // 退出当前中间件
    return
  }

  /**
     * 自定义action
     */
  const [LOADING, SUCCESS, ERROR] = types

  // request start
  function requestStart (next, LOADING) {
    return () => next({
      type: LOADING,
      path: 'LOADING'
    })
  }

  // receive data
  function requestReceiveData (next, SUCCESS) {
    return (result) => next({
      type: SUCCESS,
      path: 'LOADED',
      data: result
    })
  }

  // network error or server error
  function requestError (next, ERROR) {
    return (result) => next({
      type: ERROR,
      path: 'LOADED',
      data: result
    })
  }

  // 异步请求
  request({
    requestStart: requestStart(next, LOADING),
    requestReceiveData: requestReceiveData(next, SUCCESS),
    requestError: requestError(next, ERROR),
    ...options,
    ...action
  })
}

export default simplifyMiddleware
