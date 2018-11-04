require(['jquery','artTemplate','common'],function($,template,common){

    var brandtitleid = common.getSearch(location.search).brandtitleid
    var brandTitle = common.getSearch(location.search).brandTitle.replace('十大品牌','').replace(' ','')
    // console.log(brandTitle.length)
    $('.brand span').text(brandTitle)
    var pagesize = 4
    
    $.ajax({
        type: 'get',
        data:{
            brandtitleid: brandtitleid
        },
        url: 'http://127.0.0.1:9090/api/getbrand',
        success: function(info){
            console.log(info);
            $('.category ul').html(template('tmp',info))
        }
    })

    $.ajax({
        type:'get',
        data:{
            brandtitleid: brandtitleid,
            pagesize: pagesize 
        },
        url: 'http://127.0.0.1:9090/api/getbrandproductlist',
        success: function(info){
            console.log(info)
            $('.category ol').html(template('tmp2',info))  
            if (info.result.length === 0) {
                return
            }
            var productid = info.result[0].productId
            


            $.ajax({
                type: 'get',
                url:'http://127.0.0.1:9090/api/getproductcom',
                data: {
                    productid: productid 
                },
                success: function(data){
                    console.log(data);
                    $('.comments').html(template('tmp3',data))
                },
                complete:function(){
                    $('.comments .show .left').html(info.result[0].productImg)
                    $('.comments .show .right span').text(info.result[0].productName)                    
                }
            })
        }
    })

    
})