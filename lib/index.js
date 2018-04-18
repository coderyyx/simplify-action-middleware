'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _util = require('util');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _ajax = require('./ajax');

var _ajax2 = _interopRequireDefault(_ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var simplifyMiddleware = function simplifyMiddleware(options) {
    return function (store) {
        return function (next) {
            return function (action) {
                var successAlert = options.successAlert,
                    errorAlert = options.errorAlert,
                    sessionTimeOut = options.sessionTimeOut;
                var dispatch = store.dispatch,
                    getState = store.getState;

                // init configObject

                var url = action.url,
                    _action$types = action.types,
                    types = _action$types === undefined ? [null, null, null] : _action$types,
                    _action$method = action.method,
                    method = _action$method === undefined ? 'POST' : _action$method,
                    _action$data = action.data,
                    data = _action$data === undefined ? {} : _action$data,
                    _action$async = action.async,
                    async = _action$async === undefined ? true : _action$async,
                    _action$timeout = action.timeout,
                    timeout = _action$timeout === undefined ? 20 * 1000 : _action$timeout,
                    _action$contentType = action.contentType,
                    contentType = _action$contentType === undefined ? "application/x-www-form-urlencoded;charset=utf-8;" : _action$contentType;
                /**
                 * 防止types解构失败，初始化types
                 */
                // types = types ? types :[null,null,null];

                /**
                 * 以url为非标准action唯一依据
                 * 标准action进入下一个中间件
                 */

                if (!url) {
                    next(action);
                    //退出当前中间件
                    return;
                }

                /**
                 * 自定义action
                 */

                var _types = _slicedToArray(types, 3),
                    LOADING = _types[0],
                    SUCCESS = _types[1],
                    ERROR = _types[2];

                //request start


                function request_start(next, LOADING) {
                    return function () {
                        return next({
                            type: LOADING,
                            path: 'LOADING'
                        });
                    };
                }

                //receive data
                function request_receive_data(next, SUCCESS) {
                    return function (result) {
                        return next({
                            type: SUCCESS,
                            path: 'LOADED',
                            data: result
                        });
                    };
                }

                //network error or server error
                function request_error(next, ERROR) {
                    return function (result) {
                        return next({
                            type: ERROR,
                            path: 'LOADED',
                            data: result
                        });
                    };
                }

                //异步请求
                (0, _ajax2.default)({
                    method: method,
                    url: url,
                    data: data,
                    async: async,
                    timeout: timeout,
                    contentType: contentType,
                    sessionTimeOut: sessionTimeOut,
                    request_start: request_start(next, LOADING),
                    request_receive_data: request_receive_data(next, SUCCESS),
                    request_error: request_error(next, ERROR)
                });
            };
        };
    };
};

exports.default = simplifyMiddleware;