$(function(){

    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getinlanddiscount',
        success: function(info){
            console.log(info);
            $('.main').html(template('tmp',info))
        }
    })
})