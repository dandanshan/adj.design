$(document).ready(function () {


    $('.burger').click(function() {
        $(this).toggleClass('active');
        $('.nav').toggleClass('active');
        $('.header').toggleClass('active');
    });

    //mouse follow
    var $pointer = $('.pointer');

    // function moveCircle(e) {
    //     TweenLite.to($pointer, 0.3, {
    //         css: {
    //             left: e.pageX,
    //             top: e.pageY
    //         }
    //     });
    // }
    window.onload = function(){
        var bsDiv = document.getElementById('pointer');
        var x, y;
// On mousemove use event.clientX and event.clientY to set the location of the div to the location of the cursor:
        window.addEventListener('mousemove', function(event){
            x = event.clientX;
            y = event.clientY;                    
            if ( typeof x !== 'undefined' ){
                bsDiv.style.left = x + "px";
                bsDiv.style.top = y + "px";
            }
        }, false);
    }

    $(window).on('mousemove', moveCircle);

    $(window).scroll(function() {

        var top = $pointer.position().top
        var left = $pointer.offset().left

        console.log(top+'/'+left)

        TweenLite.to($pointer, 0.3, {
            css: {
                left: left,
                top: top
            }
        });
    });
});