require(['jquery','artTemplate','common','lazyload'],function($,template,common){


    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getinlanddiscount',
        success: function(info){
            console.log(info.result)
            $(info.result).each(function(i,e){
                e.productImg = e.productImg.replace('src','data-original')
            })
            $('.main').html(template('tmp',info))
            $('.item .imgbox img').addClass('lazy')
            $("img.lazy").lazyload({
                effect : "fadeIn",
                placeholder : "./images/gif.jpg"
            })
        }
    })
})