/**
 * 传入一个对象形成jquery请求
 */
import $ from 'jquery';

const request = (configObj) =>{

    let {
            method,
            data,
            url,
            async,
            contentType,
            next,
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
        success : function(data){
            if(typeof data === 'string')
                data = JSON.parse(data);
            if(data.result && data.result==='success')
                request_receive_data(data);
            else
                request_error();
        },
        error : function(xhr, status, err){
            sessionTimeOut(xhr);
            console.log(err);
        }
    })
 }

 export default request;