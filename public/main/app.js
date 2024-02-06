
/*-----------------------------------*/
const clear_storage_btn = document.getElementById('clear_storage');
/*-------------------------------------------------------------------*/


clear_storage_btn.addEventListener('click', function(){
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE','/files', true);
    xhr.onload = function(){
        if(xhr.status >= 200 && xhr.status < 300){
            console.log(xhr.responseText);
        }else{
            console.log('Request faild', xhr.statusText);
        }
    };

    xhr.onerror = function(){
        console.error('Request faild');
    };
    xhr.send();
});

function handleInput(){
    const input_btn_files = document.getElementById('input_btn_upload');
    const submit_btn_upload = document.getElementById('submit_btn_upload');
    if(input_btn_files.files.length > 0){
        submit_btn_upload.disabled = false;
    }else{
        submit_btn_upload.disabled = true;
    }

}