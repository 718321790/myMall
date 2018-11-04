$(function(){

    var brandtitleid = getSearch(location.search).brandtitleid
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