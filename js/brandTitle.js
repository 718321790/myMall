$(function(){

    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getbrandtitle',
        success: function(info){
            console.log(info);
            $('.category ul').html(template('tmp',info))
        }
    })
})