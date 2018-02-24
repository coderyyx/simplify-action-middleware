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
                var url = action.url,
                    types = action.types,
                    method = action.method,
                    data = action.data,
                    async = action.async,
                    timeout = action.timeout,
                    contentType = action.contentType;
                /**
                 * 防止types解构失败，初始化types
                 */

                types = types ? types : [null, null, null];
                /**
                 * 以url为非标准action唯一依据
                 * 标准action进入下一个中间件
                 */
                if (!url) {
                    next(action);
                    //不执行后续代码
                    return;
                }

                /**
                 * 自定义action
                 */

                var _types = types,
                    _types2 = _slicedToArray(_types, 3),
                    LOADING = _types2[0],
                    SUCCESS = _types2[1],
                    ERROR = _types2[2];

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
                    return function () {
                        return next({
                            type: ERROR,
                            path: 'LOADED'
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