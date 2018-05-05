/**
 * api fetch
 */
import $ from 'jquery';

const noop = ()=>{};

const request = (requestObj) =>{
    let {
            method = 'POST',
            data = {},
            url,
            async = true,
            contentType = "application/x-www-form-urlencoded;charset=utf-8;",
            timeout = 20*1000,
            request_start,
            request_receive_data,
            request_error,
            successAlert = window.alert,
            errorAlert = window.alert,
            sessionTimeOut = noop,
            equalsField = 'result',
            errorField = 'message'
        } = requestObj;
    

    if(!url){
        errorAlert('url can not be empty!');
        return;
    }

    //request start
    request_start();

    //web request
    $.ajax({
        type : method,
        url ,
        data ,
        contentType ,
        async ,
        timeout ,
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
            request_error(data);
            console.log(err);
        }
    })
 }

 export default request;