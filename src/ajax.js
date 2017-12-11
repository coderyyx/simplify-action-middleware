/**
 * 传入一个对象形成jquery请求
 */
import $ from 'jquery';

// type : 'post',
// url : '../patient/importCaseList',
// contentType : "application/x-www-form-urlencoded;charset=utf-8;",
// data:{"params":JSON.stringify(postData)},
// async : true,
// success : function (data) {
//   if(data.result && data.result=='success'){
//     return dispatch(getImportSuccess('LOADED',data));
//   }else{
//     showError(data.reason);
//     return dispatch(getImportFail('LOADED'));
//   }
// },
// error:function (xhr, status, err) {
//   Tool.sessionTimeOut.logOut(xhr);
//   console.log(err);
// }
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
            request_start,
            request_receive_data
        } = configObj;

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
            if(data.result && data.result==='success'){
                request_receive_data(data);
            }
        },
        error : function(xhr, status, err){

        }
    })
 }

 export default request;