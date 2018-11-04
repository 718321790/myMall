$(function(){

    var couponid = getSearch(location.search).couponId
    var couponTitle = getSearch(location.search).couponTitle

    $('.app-header h2').text(couponTitle+'优惠券')

    $.ajax({
        type:'get',
        url: 'http://127.0.0.1:9090/api/getcouponproduct',
        data: {
            couponid: couponid
        },
        success: function(info){
            console.log(info);
            $('.main ul').html(template('tmp',info))
        }
    })

    $('.main ul').on('click','li',function(){
        $('.modal-wrapper').show()
        $(this).addClass('active')
        var src = $(this).find('.imgbox img').attr('src')
        $('.modal .imgbox img').attr('src',src)
    })

    $('.off').on('click',function(){
        $('.modal-wrapper').hide()        
    })

    $('.left-arrow').on('click',function(){
        $('.main ul li.active').prev().addClass('active').siblings().removeClass('active')
        var src = $('.main ul li.active .imgbox img').attr('src')
        $('.modal .imgbox img').attr('src',src)
    })

    $('.right-arrow').on('click',function(){
        $('.main ul li.active').next().addClass('active').siblings().removeClass('active')
        var src = $('.main ul li.active .imgbox img').attr('src')
        $('.modal .imgbox img').attr('src',src)
    })
})