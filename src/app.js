

$( document ).ready(() => {

    gameApp = {
        hitball: 0,
        canon_x: 100,
        key_right: 'up',
        key_left: 'up',
        bullets: [],
        s_bullet: 4,
        s_ball: 4,
        size_ball: 0,
        height_game_field: 0,
        width_game_field:0,
        balls: [
            {x: 20, y: 20, move: 'right'},
            {x: 70, y: 70, move: 'right'}
        ]
    }


    for (var i=0; i<document.styleSheets.length; i++) {
        var sheet = document.styleSheets[i];
        if (sheet.href.indexOf('custom.css' >= 0)) {
            var classes = sheet.rules || sheet.cssRules
            for(var x=0;x<classes.length;x++) {
                if(classes[x].selectorText === '.ball') {
                    //this is where I can collect the style information, but how?
                    gameApp.size_ball = Math.floor(classes[x].style.getPropertyValue('height').slice(0,-2));
                }
                if(classes[x].selectorText === '.out') {
                    //this is where I can collect the style information, but how?
                    gameApp.height_game_field = Math.floor(classes[x].style.getPropertyValue('height').slice(0,-2));
                    gameApp.width_game_field = Math.floor(classes[x].style.getPropertyValue('width').slice(0,-2));
                }
    

    }
        }
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

    function clear_explosion()
    {
        document.getElementById('explosionimg').style.display = 'none';
    }

    function calc(){

        // console.log(typeof(gameApp.balls));
        for (let ball of gameApp.balls){
         if (['up', 'down', 'left', 'right'].indexOf(ball.move) != -1) {
            if(ball.x>gameApp.width_game_field-gameApp.size_ball) ball.move = 'left';
            if(ball.x<0) ball.move = 'right';
            if(ball.y>gameApp.height_game_field-gameApp.size_ball) ball.move = 'up';
            if(ball.y<0) ball.move = 'down';
         } else {
             // if  1 of 8  
            if((ball.x>gameApp.width_game_field-gameApp.size_ball) &&
                (ball.y>gameApp.height_game_field-gameApp.size_ball)) {
                    if (ball.move === 'rightdown') ball.move = 'leftup';
            } 
            // if 2 of 8
            if((ball.x<0) && (ball.y<0)) {
                if (ball.move === 'leftup') ball.move = 'rightdown';
            }
            // if 3 of 8
            if((ball.x<=gameApp.width_game_field-gameApp.size_ball) &&
                (ball.y<0)) {
                    if (ball.move === 'rightup') ball.move = 'rightdown';
                    if (ball.move === 'leftup') ball.move = 'leftdown';
            } 
            // if 4 of 8
            if((ball.x<0) && (ball.y<=gameApp.height_game_field-gameApp.size_ball)) {
                if (ball.move === 'leftup') ball.move = 'rightup';
                if (ball.move === 'leftdown') ball.move = 'rightdown';
            }
            // if 5 of 8
            if((ball.y>gameApp.height_game_field-gameApp.size_ball) && (ball.x<=gameApp.width_game_field-gameApp.size_ball)) {
                if (ball.move === 'rightdown') ball.move = 'rightup';
                if (ball.move === 'leftdown') ball.move = 'leftup';
            }
            // if 6 of 8
            if((ball.y<=gameApp.height_game_field-gameApp.size_ball) && (ball.x>gameApp.width_game_field-gameApp.size_ball)) {
                if (ball.move === 'rightup') ball.move = 'leftup';
                if (ball.move === 'rightdown') ball.move = 'leftdown';
            }
            // if 7 of 8
            if((ball.x>gameApp.width_game_field-gameApp.size_ball) &&
                (ball.y<0)) {
                    if (ball.move === 'rightup') ball.move = 'leftdown';
            } 
            // if 8 of 8
            if((ball.x<0) &&
                (ball.y>gameApp.height_game_field-gameApp.size_ball)) {
                    if (ball.move === 'leftdown') ball.move = 'rightup';
            } 

         } 


         if(ball.move === 'right') ball.x = ball.x+gameApp.s_ball;
         if(ball.move === 'left') ball.x = ball.x-gameApp.s_ball;
         if(ball.move === 'down') ball.y = ball.y+gameApp.s_ball;
         if(ball.move === 'up') ball.y = ball.y-gameApp.s_ball;
         if(ball.move === 'rightup') { ball.x = ball.x+gameApp.s_ball; ball.y = ball.y-gameApp.s_ball };
         if(ball.move === 'leftup') { ball.x = ball.x-gameApp.s_ball; ball.y = ball.y-gameApp.s_ball };
         if(ball.move === 'rightdown') { ball.x = ball.x+gameApp.s_ball; ball.y = ball.y+gameApp.s_ball };
         if(ball.move === 'leftdown') { ball.x = ball.x-gameApp.s_ball; ball.y = ball.y+gameApp.s_ball; };
        

        }

        // collision canon with ball
        for (let ball of gameApp.balls){

            if ((gameApp.canon_x >= ball.x - Math.floor(gameApp.size_ball/2)) && (gameApp.canon_x <= ball.x + Math.floor(gameApp.size_ball)) && 
            (ball.y + Math.floor(gameApp.size_ball) >= gameApp.height_game_field-Math.floor(gameApp.size_ball/2)))
            {
                alert('Hit canon! GAME OVER!');
                return 1;
            }
        }

        for (let bullet of gameApp.bullets){
            bullet.y -= gameApp.s_bullet;
            if(bullet.y<0) gameApp.bullets.splice(gameApp.bullets.indexOf(bullet),1);

          
            // collision 
            for (let ball of gameApp.balls){
                if ((bullet.y >= (ball.y - Math.floor(gameApp.size_ball/2)) && bullet.y <= (ball.y + Math.floor(gameApp.size_ball))) && 
                    (bullet.x >= (ball.x - Math.floor(gameApp.size_ball/2)) && bullet.x <= (ball.x + Math.floor(gameApp.size_ball))))
                {
                    console.log('picture');
                    document.getElementById('explosionimg').style.marginTop = bullet.y+Math.floor(gameApp.size_ball/2)+"px";
                    document.getElementById('explosionimg').style.marginLeft = bullet.x+Math.floor(gameApp.size_ball/2)+"px";                    
                    document.getElementById('explosionimg').style.display = 'block';
                    
                    var snd = new Audio("explose.wav"); 
                    snd.play();
                    setTimeout(clear_explosion,300);
                    gameApp.hitball += 1;
                    gameApp.balls.splice(gameApp.balls.indexOf(ball),1);
                    var rand_x = Math.floor(Math.random()*Math.floor(gameApp.width_game_field-gameApp.size_ball));
                    var y = 20;
                    let drive_route = ['up','down','left','right', 'leftup','leftdown','rightup','rightdown']
                    let rand_dr = Math.floor(Math.random()*Math.floor(drive_route.length))
                    gameApp.balls.push({x: rand_x, y: y, move: drive_route[rand_dr]});
                    $('#appGame').append(`<div style="top: ${y}px; left: ${rand_x}px" class="ball"></div>`);
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
            var snd = new Audio("grenade.wav"); // buffers automatically when created
            snd.play();
        }
        // console.log(gameApp);
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
