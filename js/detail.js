$(function(){

    var search = getSearch(location.search)

    var productid = search.productid
    

    $.ajax({
        url:'http://127.0.0.1:9090/api/getproduct',
        type:'get',
        data: {
            productid: productid
        },
        success:function(infos){
            var categoryid = infos.result[0].categoryId

            $.ajax({
                url: 'http://127.0.0.1:9090/api/getcategorybyid',
                type: 'get',
                data: {
                    categoryid: categoryid
                },
                success:function(info){
                    // console.log(info);
                    $('.category').html(template('tmp1',info))
                }
            })

            var productName = infos.result[0].productName
            var tempArr = productName.split(' ')
            infos.brandName = tempArr[0]
            console.log(infos);
            $('.typename').text(template('tmp',infos))
            $('.banner').html(template('tmp2',infos))
        }
    })

    // 获取评论数据
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getproductcom',
        data: {
            productid: productid
        },
        success: function(data){
            console.log(data)
            $('.comments .content').html(template('tmp3',data))
        }
    })

    
})