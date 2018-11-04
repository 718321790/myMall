require.config({
    baseUrl:'./',
    paths:{
        jquery:'lib/jquery/jquery.min',
        artTemplate:'lib/artTemplate/template-web',
        iscroll:'lib/IScroll/iscroll',
        common:'js/common',
        lazyload:'lib/jquery.lazyload'
    },
    shim:{
        lazyload: {
            deps: ['jquery']
        }
    }
})