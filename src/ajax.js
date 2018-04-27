/**
 * api fetch
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
            request_start,
            request_receive_data,
            request_error,
            successAlert,
            errorAlert,
            sessionTimeOut,
            equalsField = 'result',
            errorField = 'message'
        } = configObj;
    
    // method = method ? method :'POST';
    // contentType = contentType ? contentType : "application/x-www-form-urlencoded;charset=utf-8;";
    // data = data ? data : {};
    // async = async ? async : true;
    // timeout = timeout ? timeout : 20*1000;
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
            if(data[equalsField] && data[equalsField]==='success')
                request_receive_data(data);
            else{
                errorAlert(data[errorField] ? data[errorField] : 'fail');
                request_error(data);
            }
                
        },
        error : function(xhr, status, err){
            sessionTimeOut(xhr);
            console.log(err);
        }
    })
 }

 export default request;