require(['jquery','artTemplate','common'],function($,template,common){
    $.ajax({
        type:'get',
        url: 'http://127.0.0.1:9090/api/getcategorytitle',
        dataType: 'json',
        success: function(info){
            console.log(info)
            $('.category ul').html(template('tmp',info))

            $('.category > ul').on('click','.title',function(){
                $(this).siblings('ol').toggle()
            })

            $('.title').on('click',function(){
                console.log(1);
                $this = $(this)
                if (+$(this).data('target') === 1) {
                    var titleid = $(this).data('titleid')
                    $.ajax({
                        type:'get',
                        url: 'http://127.0.0.1:9090/api/getcategory',
                        data: {
                            titleid: titleid
                        },
                        success: function(data){
                            console.log(data);
                            console.log( $(this).siblings('ol'));
                            $this.siblings('ol').html(template('tmp1',data))
                        }
                    })
                    $(this).data('target','0')
                }
                
            })
            
        }
    })

    

})

