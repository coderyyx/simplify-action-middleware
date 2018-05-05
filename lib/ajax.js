'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noop = function noop() {}; /**
                                * api fetch
                                */


var request = function request(requestObj) {
    var _requestObj$method = requestObj.method,
        method = _requestObj$method === undefined ? 'POST' : _requestObj$method,
        _requestObj$data = requestObj.data,
        data = _requestObj$data === undefined ? {} : _requestObj$data,
        url = requestObj.url,
        _requestObj$async = requestObj.async,
        async = _requestObj$async === undefined ? true : _requestObj$async,
        _requestObj$contentTy = requestObj.contentType,
        contentType = _requestObj$contentTy === undefined ? "application/x-www-form-urlencoded;charset=utf-8;" : _requestObj$contentTy,
        _requestObj$timeout = requestObj.timeout,
        timeout = _requestObj$timeout === undefined ? 20 * 1000 : _requestObj$timeout,
        request_start = requestObj.request_start,
        request_receive_data = requestObj.request_receive_data,
        request_error = requestObj.request_error,
        _requestObj$successAl = requestObj.successAlert,
        successAlert = _requestObj$successAl === undefined ? window.alert : _requestObj$successAl,
        _requestObj$errorAler = requestObj.errorAlert,
        errorAlert = _requestObj$errorAler === undefined ? window.alert : _requestObj$errorAler,
        _requestObj$sessionTi = requestObj.sessionTimeOut,
        sessionTimeOut = _requestObj$sessionTi === undefined ? noop : _requestObj$sessionTi,
        _requestObj$equalsFie = requestObj.equalsField,
        equalsField = _requestObj$equalsFie === undefined ? 'result' : _requestObj$equalsFie,
        _requestObj$errorFiel = requestObj.errorField,
        errorField = _requestObj$errorFiel === undefined ? 'message' : _requestObj$errorFiel;


    if (!url) {
        errorAlert('url can not be empty!');
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
            if (data[equalsField] && data[equalsField] === 'success') request_receive_data(data);else {
                errorAlert(data[errorField] ? data[errorField] : 'fail');
                request_error(data);
            }
        },
        error: function error(xhr, status, err) {
            sessionTimeOut(xhr);
            request_error(data);
            console.log(err);
        }
    });
};

exports.default = request;