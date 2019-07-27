/**
 * api fetch
 */
import $ from 'jquery'

const noop = () => {}
const shouldWithCookie = (withCredentials) => {
  if (withCredentials) {
    return {
      xhrFields: {
        withCredentials: true
      }
    }
  }
  return {}
}
const request = (requestObj) => {
  const {
    method = 'POST',
    data = {},
    url,
    async = true,
    contentType = 'application/x-www-form-urlencoded;charset=utf-8;',
    timeout = 20 * 1000,
    requestStart,
    requestReceiveData,
    requestError,
    errorAlert = window.alert,
    sessionTimeOut = noop,
    equalsField = 'result',
    errorField = 'message',
    withCredentials,
    beforeSend = noop
  } = requestObj

  if (!url) {
    errorAlert('url can not be empty!')
    return
  }

  // request start
  requestStart()
  const cookieConfig = shouldWithCookie(withCredentials)
  // web request
  $.ajax({
    type: method,
    url,
    data,
    contentType,
    async,
    timeout,
    ...cookieConfig,
    beforeSend: function (xhr) {
      beforeSend(xhr)
    },
    success: function (data) {
      if (typeof data === 'string') { data = JSON.parse(data) }
      if (data[equalsField] && data[equalsField] === 'success') { requestReceiveData(data) } else {
        errorAlert(data[errorField] ? data[errorField] : 'fail')
        requestError(data)
      }
    },
    error: function (xhr, status, err) {
      sessionTimeOut(xhr)
      requestError(err)
    }
  })
}

export default request
