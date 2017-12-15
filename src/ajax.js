/**
 * 传入一个对象形成jquery请求
 */
import $ from 'jquery';

const noop = ()=>{};

const request = (configObj) =>{

    let {
            method,
            data,
            url,
            async,
            contentType,
            timeout,
            successAlert,
            errorAlert,
            sessionTimeOut,
            request_start,
            request_receive_data,
            request_error
        } = configObj;
    
    method = method ? method :'POST';
    contentType = contentType ? contentType : "application/x-www-form-urlencoded;charset=utf-8;";
    data = data ? data : {};
    async = async ? async : true;
    timeout = timeout ? timeout : Number.MAX_VALUE;
    sessionTimeOut = sessionTimeOut ? sessionTimeOut : noop;
    successAlert = successAlert ? successAlert : window.alert;
    errorAlert = errorAlert ? errorAlert : window.alert;

    if(!url){
        alert('url not be empty!');
        return;
    }

    //request start
    request_start();

    //web request
    $.ajax({
        type : method,
        url : url,
        data : data,
        contentType : contentType,
        async : async,
        timeout:timeout,
        success : function(data){
            if(typeof data === 'string')
                data = JSON.parse(data);
            if(data.result && data.result==='success')
                request_receive_data(data);
            else{
                errorAlert(data.reason?data.reason:'fail');
                request_error();
            }
                
        },
        error : function(xhr, status, err){
            sessionTimeOut(xhr);
            console.log(err);
        }
    })
 }

 export default request;