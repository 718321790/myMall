$(function(){

    var shopObj,areaObj,target,areaid = 0,shopid=0;
    $.ajax({
        type:'get',
        url: 'http://127.0.0.1:9090/api/getgsshop',
        success: function(info){
            console.log(info);
            shopObj = info
        }
    })

    $.ajax({
        type:'get',
        url: 'http://127.0.0.1:9090/api/getgsshoparea',
        success: function(info){
            console.log(info);
            areaObj = info
        }
    })

    // 点击商店按钮
    $('.nav .shop').on('click',function(){
        $('.nav ol').toggle().html(template('tmp',shopObj))
        $(this).find('i').toggleClass('fa-caret-down').toggleClass('fa-caret-up')
        if (target === 0) {
            $('.nav ol').show()
            $(this).find('i').removeClass('fa-caret-up').addClass('fa-caret-down')
            $(this).siblings().find('i').removeClass('fa-caret-down').addClass('fa-caret-up')            
        }
        target = 1;
    })

    //点击地区按钮
    $('.nav .area').on('click',function(){
        $('.nav ol').toggle().html(template('tmp1',areaObj))
        $(this).find('i').toggleClass('fa-caret-down').toggleClass('fa-caret-up')        
        if (target === 1) {
            $('.nav ol').show()
            $(this).find('i').removeClass('fa-caret-up').addClass('fa-caret-down') 
            $(this).siblings().find('i').removeClass('fa-caret-down').addClass('fa-caret-up')                                  
        }
        target = 0;
    })

    // 点击ol中的li切换
    $('ol').on('click','li',function(){
        if ($(this).hasClass('shop')) {
            shopid = $(this).data('shopid')
            console.log(shopid);
            $('.nav .shop').trigger('click').find('span').text($(this).text())
        }
        else if($(this).hasClass('area')){
            areaid = $(this).data('areaid')
            console.log(areaid);
            $('.nav .area').trigger('click').find('span').text($(this).text().slice(0,2))           
        }
        
        render()
    })

    render()

    function render(){
        $.ajax({
            type:'get',
            url: 'http://127.0.0.1:9090/api/getgsproduct',
            data: {
                shopid: shopid,
                areaid: areaid 
            },
            success: function(info){
                console.log(info);
                $('.main').html(template('tmp2',info))
            }
        })
    }
   
    
})