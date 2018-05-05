import { isArray } from "util";
import $ from 'jquery';
import request from './ajax';

const simplifyMiddleware = options => store => next => action =>{

    let {dispatch,getState} = store;

    // init configObject
    let { 
            types = [null,null,null]
        } = action;
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
        ...options,
        ...action
    })
}

export default simplifyMiddleware;