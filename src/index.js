import { isArray } from "util";
import $ from 'jquery';
import request from './ajax';

const simplifyMiddleware = options => store => next => action =>{
    let {successAlert,errorAlert,sessionTimeOut} = options;
    let {dispatch,getState} = store;

    let { 
            url , 
            types , 
            method , 
            data , 
            async, 
            timeout,
            contentType
        } = action;
    
    types = types ? types :[null,null,null];
    /**
     * 标准action进入下一个中间件
     */
    if(!url || !isArray(types)){
        next(action);
        //不执行后续代码
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
        return ()=>next({
            type : ERROR,
            path : 'LOADED'
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
        sessionTimeOut,
        request_start:request_start(next,LOADING),
        request_receive_data:request_receive_data(next,SUCCESS),
        request_error:request_error(next,ERROR)
    })
}

export default simplifyMiddleware;