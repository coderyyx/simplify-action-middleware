import { isArray } from "util";
import $ from 'jquery';
import request from './ajax';

const simplifyMiddleware = options => store => next => action =>{
    // let {
    //     successAlert,
    //     errorAlert,
    //     sessionTimeOut,
    //     equalsField = 'result',
    //     errorField = 'message'
    // } = options;

    let {dispatch,getState} = store;

    // init configObject
    let { 
            url , 
            types = [null,null,null], 
            method = 'POST', 
            data = {}, 
            async = true, 
            timeout = 20*1000,
            contentType = "application/x-www-form-urlencoded;charset=utf-8;"
        } = action;
    /**
     * 防止types解构失败，初始化types
     */
    // types = types ? types :[null,null,null];

    /**
     * 以url为非标准action唯一依据
     * 标准action进入下一个中间件
     */
    if(!url){
        next(action);
        //退出当前中间件
        return;
    }

    /**
     * 自定义action
     */
    const [LOADING,SUCCESS,ERROR] = types;
    
    //request start
    function request_start(next,LOADING){
        return ()=>next({
            type : LOADING,
            path : 'LOADING'
        });
    }

    //receive data
    function request_receive_data(next,SUCCESS){
        return (result)=>next({
            type : SUCCESS,
            path : 'LOADED',
            data : result
        })
    }

    //network error or server error
    function request_error(next,ERROR){
        return (result)=>next({
            type : ERROR,
            path : 'LOADED',
            data : result
        });
    }

    //异步请求
    request({
        method ,
        url ,
        data , 
        async , 
        timeout,
        contentType,
        request_start:request_start(next,LOADING),
        request_receive_data:request_receive_data(next,SUCCESS),
        request_error:request_error(next,ERROR),
        ...options
    })
}

export default simplifyMiddleware;