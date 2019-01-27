
	var a = $('.game_box').offset().left;
	var b = $('.game_box').offset().top;
	$('.snake_head').css('left',a+50).css('top',b+0);
	var snake_head = $('.snake_head');
	var snake_body = $('.snake_body');
	for(var index = 0;index < snake_body.length;index ++){
		snake_body.eq(index).css('left',snake_head.offset().left-(index+1)*10).css('top',snake_head.offset().top);
	}

	var direction_now = 'right';
	snake_move = function(direction){
		var snake_head_top = $('.snake_head').offset().top;
		var snake_head_left = $('.snake_head').offset().left;
		// alert('22');
		if(direction == 'left'){
			$('.snake_head').animate({
				left : '-=10px'
			});
			direction_now = 'left';
		}else if(direction == 'right'){
			$('.snake_head').animate({
				left : '+=10px'
			});
			direction_now = 'right';
		}else if(direction == 'up'){
			$('.snake_head').animate({
				top : '-=10px'
			});
			direction_now = 'up';
		}else if(direction == 'down'){
			$('.snake_head').animate({
				top : '+=10px'
			});
			direction_now = 'down';
		}
					
		$('.snake_body').eq(0).animate({
			left : snake_head_left,
			top : snake_head_top
		})

		for(var index = 1;index < $('.snake_body').length;index ++){
			$('.snake_body').eq(index).animate({
				top : $('.snake_body').eq(index-1).offset().top,
				left : $('.snake_body').eq(index-1).offset().left
			})
		}

		judge_out();
	}

	judge_out = function(){
		var snake_head = $('.snake_head').offset();
		var snake_food = $('.snake_food').offset();
		var game_box = $('.game_box').offset();
		// console.log(snake_head.top + ',' + snake_head.left);
		if(direction_now == 'left'){
			if(snake_head.left - 10 < game_box.left){
				window.clearInterval(start_move_status);
				$(document).unbind();
				alert('你gg了,左出界');
			}else if(snake_head.left - 10 == snake_food.left && snake_head.top == snake_food.top){
				console.log(snake_head.left+','+snake_food.left);
				console.log('左吃到');
				// window.clearInterval(start_move_status);
				eat_food_operation();
			}
			$('.snake_body').each(function(index){
				if(snake_head.top == $('.snake_body').eq(index).offset().top && snake_head.left == $('.snake_body').eq(index).offset().left){
					window.clearInterval(start_move_status);
					$(document).unbind();
					alert('你gg了');
				}
			});
		}else if(direction_now == 'up'){
			if(snake_head.top - 10 < game_box.top){
				window.clearInterval(start_move_status);
				$(document).unbind();
				alert('你gg了,上出届');
			}else if(snake_head.top - 10 == snake_food.top && snake_head.left == snake_food.left){
				console.log(snake_head.top+','+snake_food.top);
				console.log('上吃到');
				// window.clearInterval(start_move_status);
				eat_food_operation();
			}
			$('.snake_body').each(function(index){
				if(snake_head.top == $('.snake_body').eq(index).offset().top && snake_head.left == $('.snake_body').eq(index).offset().left){
					window.clearInterval(start_move_status);
					$(document).unbind();
					alert('你gg了');
				}
			});
		}else if(direction_now == 'right'){
			if(snake_head.left + 20 > game_box.left + 500){
				window.clearInterval(start_move_status);
				$(document).unbind();
				alert('你gg了,右出界');
			}else if(snake_head.left + 10 == snake_food.left && snake_head.top == snake_food.top){
				console.log(snake_head.left+','+snake_food.left);
				console.log('右吃到');
				// window.clearInterval(start_move_status);
				eat_food_operation();
			}
			$('.snake_body').each(function(index){
				if(snake_head.top == $('.snake_body').eq(index).offset().top && snake_head.left == $('.snake_body').eq(index).offset().left){
					window.clearInterval(start_move_status);
					$(document).unbind();
					alert('你gg了');
				}
			});
		}else if(direction_now == 'down'){
			if(snake_head.top + 20 > game_box.top + 500){
				window.clearInterval(start_move_status);
				$(document).unbind();
				alert('你gg了,下出界');
			}else if(snake_head.top + 10 == snake_food.top && snake_head.left == snake_food.left){
				console.log(snake_head.top+','+snake_food.top);
				console.log('下吃到');
				// window.clearInterval(start_move_status);
				eat_food_operation();
			}
			$('.snake_body').each(function(index){
				if(snake_head.top == $('.snake_body').eq(index).offset().top && snake_head.left == $('.snake_body').eq(index).offset().left){
					window.clearInterval(start_move_status);
					$(document).unbind();
					alert('你gg了');
				}
			});
		}
	}

	random_apper = function(){
		var snake_food_left = 10*Math.round(Math.random()*50);
		var snake_food_top = 10*Math.round(Math.random()*50);
		console.log(snake_food_left);
		var game_box = $('.game_box').offset();
		var is_apper = true;

		$('.snake_body').each(function(index){
			if($('.snake_body').eq(index).offset().top == game_box.top + snake_food_top){
				is_apper = false;
				return;
			}
		});

		if($('.snake_head').offset.top == game_box.top + snake_food_top){
			is_apper = false;
		}

		if(is_apper){
			$('.snake_food').css('left',game_box.left + snake_food_left).css('top',game_box.top + snake_food_top).css('display','block');
		}else{
			random_apper();
		}
	}

	random_apper();
	start_move_status = setInterval('snake_move(direction_now)',500);

	eat_food_operation = function(){
		console.log('heihei');
		var snake_food = $('.snake_food').offset();
		var snake_head = $('.snake_head').offset();
		// var snake_body = $('.snake_body');
		$('.game_box').append('<div class=\"snake_body\"></div>');
		var snake_body = $('.snake_body');
		snake_body.eq(snake_body.length - 1).css('left',snake_body.eq(snake_body.length - 2).left).css('top',snake_body.eq(snake_body.length - 2).top);
		$('snake_head').css('left',snake_food.left).css('top',snake_food.top);
		random_apper();
	}

	

	$(document).keyup(function(evt){
		evt = (evt) ? evt : ((window.event) ? window.event : "")
		keyCode = evt.keyCode ? evt.keyCode : (evt.which ? evt.which : evt.charCode);
		// console.log(evt);
		if(keyCode == 40 && direction_now != 'up'){
			direction_now = 'down';
			console.log(direction_now);
			// snake_move();
			window.clearInterval(start_move_status);
			start_move_status = setInterval('snake_move(direction_now)',500);
      	}else if(keyCode == 39 && direction_now != 'left'){
			direction_now = 'right';
			console.log(direction_now);
			// snake_move();
			window.clearInterval(start_move_status);
			start_move_status = setInterval('snake_move(direction_now)',500);
		}else if(keyCode == 37 && direction_now != 'right'){
			direction_now = 'left';
			console.log(direction_now);
			// snake_move();
			window.clearInterval(start_move_status);
			start_move_status = setInterval('snake_move(direction_now)',500);
		}else if(keyCode == 38 && direction_now != 'down'){
			direction_now = 'up';
			console.log(direction_now);
			// snake_move();
			window.clearInterval(start_move_status);
			start_move_status = setInterval('snake_move(direction_now)',500);
		}
	});

