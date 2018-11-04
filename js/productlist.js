require(['jquery','artTemplate','common'],function($,template,common){


    var search = common.getSearch(location.search)

    var categoryid = search.categoryid
    var pageid = $('#page').val() || 1


    // 渲染分页按钮
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getproductlist',
        data: {
            categoryid: categoryid,
            pageid: pageid
        },
        success: function (info) {
            console.log(info);
            var sum = Math.ceil(info.totalCount / info.pagesize)
            info.sum = sum
            $('#page').html(template('tmp1', info))


            // 改变页码重新渲染
            $('#page').on('change' ,function () {
                pageid = $('option:selected').val()
                $('option[value='+ pageid +']').attr('selected',true).siblings().attr('selected',false)
                              
                render()

                
            })

            // 点击上一页下一页按钮功能
            $('.pre').on('click', function () {
                if (+$('option[selected]').val() === 1) {
                    return
                }
              
                $('option[selected]').prev().attr('selected',true).siblings().attr('selected',false)
                
                pageid = $('option[selected]').val()
                $('#page').val($('option[selected]').val())
                
                render()
            })
            $('.next').on('click', function () {
                if (+$('option[selected]').val() === sum) {
                    return
                }
                $('option[selected]').next().attr('selected',true).siblings().attr('selected',false)
                              
                pageid = $('option[selected]').val()
                $('#page').val($('option[selected]').val())
                
                render()
            })
        }
    })

    // 渲染分类名称
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getcategorybyid',
        data: {
            categoryid: categoryid
        },
        success: function (info) {
            console.log(info);
            $('.typename').text(template('tmp', info))
        }
    })


    


    // 渲染
    function render() {
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getproductlist',
            data: {
                categoryid: categoryid,
                pageid: pageid
            },
            success: function (infos) {
                console.log(infos);
                $('.main ul').html(template('tmp2',infos))
            }
        })
    }
render()


})