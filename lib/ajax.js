'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noop = function noop() {}; /**
                                * 传入一个对象形成jquery请求
                                */


var request = function request(configObj) {
    var method = configObj.method,
        data = configObj.data,
        url = configObj.url,
        async = configObj.async,
        contentType = configObj.contentType,
        timeout = configObj.timeout,
        successAlert = configObj.successAlert,
        errorAlert = configObj.errorAlert,
        sessionTimeOut = configObj.sessionTimeOut,
        request_start = configObj.request_start,
        request_receive_data = configObj.request_receive_data,
        request_error = configObj.request_error;


    method = method ? method : 'POST';
    contentType = contentType ? contentType : "application/x-www-form-urlencoded;charset=utf-8;";
    data = data ? data : {};
    async = async ? async : true;
    timeout = timeout ? timeout : Number.MAX_VALUE;
    sessionTimeOut = sessionTimeOut ? sessionTimeOut : noop;
    successAlert = successAlert ? successAlert : window.alert;
    errorAlert = errorAlert ? errorAlert : window.alert;

    if (!url) {
        alert('url not be empty!');
        return;
    }

    //request start
    request_start();

    //web request
    _jquery2.default.ajax({
        type: method,
        url: url,
        data: data,
        contentType: contentType,
        async: async,
        timeout: timeout,
        success: function success(data) {
            if (typeof data === 'string') data = JSON.parse(data);
            if (data.result && data.result === 'success') request_receive_data(data);else {
                errorAlert(data.reason ? data.reason : 'fail');
                request_error();
            }
        },
        error: function error(xhr, status, err) {
            sessionTimeOut(xhr);
            console.log(err);
        }
    });
};

exports.default = request;