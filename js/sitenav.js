require(['jquery','artTemplate','common'],function($,template,common){


    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getsitenav',
        success: function(info){
            console.log(info)
            $('.main').html(template('tmp',info))
        }
    })
})