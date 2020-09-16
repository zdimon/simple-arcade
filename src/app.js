$( document ).ready(() => {


    gameApp = {
        balls: [
            {x: 0, y: 0, move: 'right'},
            {x: 50, y: 50, move: 'right'}
        ],
        canon_x: 100,
        key_right: 'up',
        key_left: 'up',
        bullets: []
    }


    function clear(){
        $('#appGame').empty();
    }


    function draw(){
        for (let ball of gameApp.balls){
            $('#appGame').append(`<div style="top: ${ball.y}px; left: ${ball.x}px" class="ball"></div>`);
        }

        $('#appGame').append(`<div style="top:180px; left: ${gameApp.canon_x}px" id="canon"></div>`);


        for (let bullet of gameApp.bullets){
            $('#appGame').append(`<div style="top: ${bullet.y}px; left: ${bullet.x}px" class="bullet"></div>`);
        }
      
    }

    function calc(){

        for (let ball of gameApp.balls){

         if(ball.x>170) ball.move = 'left';
         if(ball.x<0) ball.move = 'right';

          if(ball.move === 'right') ball.x = ball.x+4;
          if(ball.move === 'left') ball.x = ball.x-4;

        }


        for (let bullet of gameApp.bullets){

            bullet.y -= 10;
            if(bullet.y<0) gameApp.bullets.splice(gameApp.bullets.indexOf(bullet),1);

            // collision 

            

           }

        if(gameApp.key_left === 'down') (gameApp.canon_x>0)? gameApp.canon_x -= 5:  gameApp.canon_x = 0; 


        if(gameApp.key_right === 'down') (gameApp.canon_x<190)? gameApp.canon_x += 5: gameApp.canon_x = 190 ; 

    }


    function eventloop(){
        calc();
        clear();
        draw();
        setTimeout(eventloop,100);
    }


    $(document).on('keydown', (e) => {
        if(e.keyCode === 39) gameApp.key_right = 'down';
        if(e.keyCode === 37) gameApp.key_left = 'down';
        if(e.keyCode === 32) {
            gameApp.bullets.push({x: gameApp.canon_x, y: 185})
        }
        console.log(gameApp);
    })

    $(document).on('keyup', (e) => {
        if(e.keyCode === 39) gameApp.key_right = 'up';
        if(e.keyCode === 37) gameApp.key_left = 'up';
    })


    eventloop();



    //$('#boll').attr('top')
    //console.log(parseInt($('#boll').position().top)+5);

    // var ball = {
    //     el: $('#boll'),
    //     move: 'right'
    // };

    // function myFunc() {
    //     //console.log($.now());\
    //     if (ball.move === 'right') {
    //         var newCoordinate = parseInt(ball.el.position().left)+5;
    //     }

    //     if (ball.move === 'left') {
    //         var newCoordinate = parseInt(ball.el.position().left)-5;
    //     }


    //     if (newCoordinate>170) {
    //         ball.move = 'left';
    //     }
    //     if (newCoordinate<0) {
    //         ball.move = 'right';
    //     }
    //     ball.el.css({'left': newCoordinate+'px'});

    //     setTimeout(myFunc,100);
    // }


    // setTimeout(myFunc,100);
})
