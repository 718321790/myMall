require(['jquery','artTemplate','iscroll','common'],function($,template,IScroll,common){

    var titleid //ul's total width


    // reset ul width on page resize
    window.addEventListener('resize', setTotal)
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            setTotal()
        }
    })

    // set ul total width
    function setTotal(){
        var total = 0;
        $('.nav ul li').each(function(i,e){
            total += $(this).outerWidth()
        })
        total += $('.nav .right').width()
        $('.nav ul').width(total)
    }

    
    $.ajax({
        type:'get',
        url: 'http://127.0.0.1:9090/api/getbaicaijiatitle',
        success: function(info){
            console.log(info)
            $('.nav ul').html(template('tmp',info))

            setTotal()


            // 初始化区域滚动
            new IScroll('.nav',{
                scrollX: true,
                scrollY: false
            });

            // 先获取一次nav选中
            titleid = $('.nav ul li.active').data('id')
            // console.log(titleid);
            // 渲染一次
            render()

            $('.nav ul li').on('click',function(){
                $(this).addClass('active').siblings().removeClass('active')

                titleid = $(this).data('id')

                render()
            })
        }
    })


    function render(){

        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getbaicaijiaproduct',
            data: {
                titleid: titleid
            },
            success: function(info){
                console.log(info);
                $(info.result).each(function(i,e){

                    
                    //领取了几张
                    // console.log(num);
                    info.hasGet = common.fn(e.productCouponRemain,'<b>','</b>') 
                    
                    // 进度条当前宽
                    info.progress = common.fn(e.productCouponRemain,'</em><span>','</span></i>')
                    
                    //领取几元优惠券和链接
                    info.discountP = common.fn(e.productCoupon,'target="_blank">','</a>')
                    
                    info.discountPURL = common.fn(e.productCoupon,'href="','" target=')
                    
                    // 下单链接
                    info.buyURL = common.fn(e.productHref,'href="','" target=')                    
                    
                })
                $('.discount .content').html(template('tmp1',info))
            }
        })
    }
    


    // $.ajax({
    //     type:'get',
    //     url: 'http://127.0.0.1:9090/api/getbaicaijiaproduct',
    //     data:{
    //         titleid: titleid
    //     },
    //     success: function(info){

    //     }
    // })
})