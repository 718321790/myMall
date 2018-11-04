require(['jquery','artTemplate','common'],function($,template){
    // 渲染导航栏
        $.ajax({
            type:'get',
            url:'http://127.0.0.1:9090/api/getindexmenu',
            dataType: 'json',
            success: function(info){
                console.log(info)
                $('.app-nav ul').html(template('tmp',info))

                $('.app-nav ul a[href=#]').on('click', function(){
                    $('.app-nav ul').toggleClass('more')
                })
            }
        })

        // 渲染折扣商品
        $.ajax({
            type:'get',
            url: 'http://127.0.0.1:9090/api/getmoneyctrl',
            dataType: 'json',
            success: function(info){
                console.log(info)
                console.log(info.result);
                $(info.result).each(function(index,ele){
                    var comment = ele.productComCount
                    comment = comment.slice(1,2)
                    info.result[index].count = comment
                })
                $('.discount ul').html(template('tmp1',info))
            }
        })
})




    
