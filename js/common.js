// 返回页面顶部
$(function(){
    $('.backTop').click(function(){
        $('html,body').animate({scrollTop: '0px'}, 800);
    })
})



// 传入一个url字符串，返回一个键值对对象
function getSearch(str){
    var obj = {}
    var search = decodeURI(str)
    // var search = '?key=vans&name=zs&age=19'//测试用
    // console.log(search)
    var arr = search.slice(1)
    
    arr = arr.split('&')

    for (var i = 0; i < arr.length; i++) {
        var item = arr[i].split('=')
        obj[item[0]] = item[1]
    }
    // console.log(obj)
    return obj
}

// 渲染分页按钮
// var pageid = $('#page').val() || 1


// 剪切数据，返回一个字符串中位于str1 和 str2中的数据 obj为数据字符串
function fn(obj,str1,str2){
    var num = obj.indexOf(str1)
    var num1 = obj.indexOf(str2) 
    var str =  obj.slice(num+str1.length,num1)
    return str
}