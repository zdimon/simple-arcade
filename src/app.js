

$( document ).ready(() => {


    gameApp = {
        hitball: 0,
        balls: [
            {x: 20, y: 20, move: 'right'},
            {x: 70, y: 70, move: 'right'}
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

        $('#appGame').append(`<div style="top:10px; left: 180px">Hit the ball: ${gameApp.hitball}</div>`);

        for (let ball of gameApp.balls){
            $('#appGame').append(`<div style="top: ${ball.y}px; left: ${ball.x}px" class="ball"></div>`);
        }

        $('#appGame').append(`<div style="top:180px; left: ${gameApp.canon_x}px" id="canon"></div>`);


        for (let bullet of gameApp.bullets){
            $('#appGame').append(`<div style="top: ${bullet.y}px; left: ${bullet.x}px" class="bullet"></div>`);
        }
      
    }

    function calc(){

        console.log(typeof(gameApp.balls));
        for (let ball of gameApp.balls){

         if(ball.x>170) ball.move = 'left';
         if(ball.x<0) ball.move = 'right';
         if(ball.y>170) ball.move = 'up';
         if(ball.y<0) ball.move = 'down';


          if(ball.move === 'right') ball.x = ball.x+4;
          if(ball.move === 'left') ball.x = ball.x-4;
          if(ball.move === 'down') ball.y = ball.y+4;
          if(ball.move === 'up') ball.y = ball.y-4;

        }


        for (let bullet of gameApp.bullets){

            bullet.y -= 10;
            if(bullet.y<0) gameApp.bullets.splice(gameApp.bullets.indexOf(bullet),1);

          
            // collision 
            for (let ball of gameApp.balls){
                var el = document.querySelector('.ball');
                var style = getComputedStyle(el).height;
                const size_ball = Math.floor(style.slice(0,-2)/2);

                var el = document.querySelector('#canon');
                var style = getComputedStyle(el).top;
                console.log('canony', style)
                const canon_y = Math.floor(style.slice(0,-2));

                console.log(size_ball);
                console.log(bullet.x, bullet.y, ball.x, ball.y)
                if ((bullet.y <= ball.y + size_ball && bullet.y >= ball.y - size_ball) && 
                     (bullet.x <= ball.x+ size_ball && bullet.x >= ball.x - size_ball))
                {
                    gameApp.hitball += 1;
                    gameApp.balls.splice(gameApp.balls.indexOf(ball),1);
                    var rand_x = Math.floor(Math.random()*Math.floor(170));
                    var y = 20;
                    gameApp.balls.push({x: rand_x, y: y, move: 'down'});
                    console.log('push',gameApp.balls);
                    $('#appGame').append(`<div style="top: ${y}px; left: ${rand_x}px" class="ball"></div>`);
                }
                if ((gameApp.canon_x <= ball.x + size_ball && gameApp.canon_x >= ball.x - size_ball) && 
                (canon_y <= ball.y + size_ball && canon_y >= ball.y - size_ball))
                {
                    alert('Hit canon! GAME OVER');
                }

            }

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
