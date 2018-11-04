require(['jquery','artTemplate','common'],function($,template,common){


    var pageid = $('#page').val() || 0

    function render(){
        $.ajax({
            type:'get',
            url: 'http://127.0.0.1:9090/api/getmoneyctrl',
            data: {
                pageid: pageid
            },
            success: function(info){
                console.log(info);

                $('.discount .content').html(template('tmp1',info))
            }
        })
    }
    
    render()


    
    // 渲染分页按钮
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getmoneyctrl',
        data: {
            pageid: pageid
        },
        success: function (info) {
            console.log(info);
            var sum = Math.ceil(info.totalCount / info.pagesize)
            info.sum = sum
            $('#page').html(template('tmp', info))


            // 改变页码重新渲染
            $('#page').on('change' ,function () {
                pageid = $('option:selected').val() - 1
                $('option[value='+ (pageid + 1) +']').attr('selected',true).siblings().attr('selected',false)
                
                              
                render()
                $('#page').val($('option[selected]').val())
            })

            // 点击上一页下一页按钮功能
            $('.pre').on('click', function () {
                if (+$('option[selected]').val() === 1) {
                    return
                }
              
                $('option[selected]').prev().attr('selected',true).siblings().attr('selected',false)
                
                pageid = $('option[selected]').val() - 1
                $('#page').val($('option[selected]').val())
                
                render()
            })
            $('.next').on('click', function () {
                if (+$('option[selected]').val() === sum) {
                    return
                }
                $('option[selected]').next().attr('selected',true).siblings().attr('selected',false)
                              
                pageid = $('option[selected]').val() - 1
                $('#page').val($('option[selected]').val())
                
                render()
            })
        }
    })
})