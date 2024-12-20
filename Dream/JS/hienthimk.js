$(document).ready(function(){
    $('#eye').click(function(){
        $(this).toggleClass('open');
        $(this).children('i').toggleClass('fa fa-eye-slash');
        if($(this).hasClass('open')){
            // alert('Type text');
            $(this).prev().attr('type','text');
        }
        else{
            $(this).prev().attr('type','password');
        }
    });
});

    

