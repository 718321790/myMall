$(function(){
    var productid  = +getSearch(location.search).productid 

    $.ajax({
        url: 'http://127.0.0.1:9090/api/getmoneyctrlproduct',
        type: 'get',
        data: {
            productid: productid 
        },
        success: function(info){
            console.log(info);
            var data = info.result[0]
            console.log(data);
            $('.prodyct_city').html(data.productCity)
            $('.comment').html(data.productComment)
            $('.product_desc').html(template('tmp',data))
        }
    })
})