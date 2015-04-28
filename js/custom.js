jQuery(document).ready(function($){	
	//YOUTUBE
	jQuery(".player").mb_YTPlayer();
	
	//START NOW
	$('.start_now').on('click',function(){
		$('.a_about').trigger('click');
		return false;
	});
	//COLORBOX
	$(".pp_image").colorbox({rel:'pp_image',maxWidth:'100%',maxHeight:'100%'});
	$(".pp_video").colorbox({rel:'pp_video',maxWidth:'100%',maxHeight:'100%',iframe:true,innerWidth:425,innerHeight:344});
	
	/* HOME */
	$('.ul_home_skill').cycle({slides:'>li',autoHeight:'container'});
	/* HOME ENDS */
	
	/* TWITTER */
	$('#twitter_data').wTwitter({
		 onTwitterDone: function(txt) {
			txt = '<div class="prev_block">' +
						'<div class="prev">' +
							'<div class="left_arrow"></div>' + 
						'</div>' +
					'</div>' +
					'<div class="next_block">' +
						'<div class="next">' +
							'<div class="right_arrow"></div>' +
						'</div>' +
					'</div>' +
					txt;
					
			$('#twitter_data').html(txt).find('.ul_twitter').cycle({slides:'>li',autoHeight:'container',prev:'#twitter_data .prev',next:'#twitter_data .next'});
		 },
		 isformatBuilder:true,
		 formatBuilder:function(){
			tempx = '<li><div class="twitter_header">' 
												+ '<a href="http://twitter.com/'+ twitter_screen_name +'" title="">' + 
												'<img alt ="" src="'+ src_url +'">' + 
												'<span class="twitter_name">' + twitter_name + "</span>" +
												'<span class="twitter_screen_name">@' + twitter_screen_name + "</span>" + "</a>" +
											'</div>'+
											'<div class="twitter_content">'
												  + text + 
											'</div>' +
											'</li>';
			return tempx;
		 },
		 max_tweet:3,
		 img:'images/twitter/twitter_icon.png'
	});
	
	$('#twitter_widget').wTwitter({
		onTwitterDone: function(txt) {
			//$('#twitter_widget').html(txt);
		},
		isformatBuilder:true,
		formatBuilder:function(){
			tempx = '<li><div class="twitter_header">' 
												+ '<a href="http://twitter.com/'+ twitter_screen_name +'" title="">' + 
												'<img alt ="" src="'+ src_url +'">' + 
												'<span class="twitter_screen_name">@' + twitter_screen_name + "</span>" +
												'<span class="twitter_time">' + time + '</span>' +
												"</a>" +
											'</div>'+
											'<div class="twitter_content">'
												  + text + 												
											'</div>' +
											'</li>';
			return tempx;
		},
		max_tweet:3,
		img:'images/twitter/twitter_icon.png'
	});
	
	/* TESTIMONIAL */
	$('.ul_testimonial').cycle({slides:'>li',autoHeight:'container',prev:'#id_testimonial .prev',next:'#id_testimonial .next'});
	
	/* MENU */
	
	$("ul.nav>li.dropdown").hover(function() {
		$(this).addClass('open');
	}, function() {
		$(this).removeClass('open');
	});
	if ($('.frontpage_menu').length>0) {
		$('#id_menu ul').onePageNav({
			currentClass: 'current',
			changeHash: true,
			filter: ':not(.external)',
			end: function(e){
				
			},
			begin : function(e){
				
			}
		});
	
		// FIRST SCROLL IF FROM EXTERNAL ANCHOR
		$.scrollTo({ top:0, left:0 });
		$tref = '#' + window.location.hash.replace('#', '');
		if ($tref!='#') {
			$("a[href*=#"+ window.location.hash.replace('#', '') +"]").trigger('click');
		}
	}
	// STICKY
	jQuery("#id_menu").sticky();
	
	
	/* MENU ENDS*/
	/* PORTFOLIO */
	
	if	($('#ul_portfolio').length!==0) {
		$(".ul_portfolio_category li a").on('click',function(){
			$(".ul_portfolio_category").find('a').removeClass('active');
			$(this).addClass('active');
			return false;
		});
			
		$('#ul_portfolio').mixitup();
		
	
		/* Load More Portfolio */
		
		portfolio_number = 1;
		$('#load_more_portfolio').click(function(){
			href = $(this).attr('href');
			
			$.ajax({
				type: "GET",
				url: href,
				cache: false,
				beforeSend: function() {
					
				},
				success: function(data){
					//$('.ul_portfolio_category li:first-child>a').trigger('click');
					portfolio_number = portfolio_number + 1
					$('#ul_portfolio').append(data);
					$('#ul_portfolio').mixitup();
					//COLORBOX
					$(".pp_image").colorbox({rel:'pp_image',maxWidth:'100%',maxHeight:'100%'});
					$(".pp_video").colorbox({rel:'pp_video',maxWidth:'100%',maxHeight:'100%',iframe:true,innerWidth:425,innerHeight:344});
					$('.ul_portfolio_category li:first-child>a').trigger('click');
					//$('.ul_portfolio_category').find('.active').trigger('click');
					$('#load_more_portfolio').attr("href", "portfolio_"+portfolio_number +'.php');
				},
				error : function() {
					$('#load_more_portfolio').hide();
				}
			});
			
			return false;
			
		});
		
	}
	
	/* RESUME QUESTION ANSWER */
	$('.ul_questions>li .answer_container').click(function(){
		//$(this).find('.plus_minus').toggleClass('plus_minus_active');
		$(this).parent().find('.answer_desc').toggle();
		return false;
	});
	
	/* FORM CONTACT */
	//SUBMIT FORM
	$.validator.addMethod(
		"math", 
		function(value, element, params) { 
			if (value=='')
				return false;
			return this.optional(element) || value == params[0] + params[1]; 
		},
		jQuery.format("Please enter the correct value for {0} + {1}")
	);
	$('#form-contact').validate({
		rules: {
			input_name: {
				minlength: 3,
				required: true
			},
			input_email: {
				required: true,
				email: true
			},
			input_subject: {
				minlength: 3,
				required: true
			},
			input_message: {
				minlength: 10,
				required: true
			},
			input_captcha: {
				math: [3, 4]
			}
		},
		submitHandler: function(form) {
			var a=$('#form-contact').serialize();
			$.ajax({
				type: "POST",
				url: "contact_process.php",
				data:a,
				complete:function(){
				},
				beforeSend: function() {
				
				},
				success: function(data){
					
					if (data=='success') {
						$('#form-contact').find("input[type=text], textarea").val("");
						alert('Email has been successfully sent');
					} else {
						alert(data);
					}
				},
				error : function() {
				
				}
			});
			return false;
		}
	});
	
	//Form Comment
	$('#form-comment').validate({
		rules: {
			input_name: {
				minlength: 3,
				required: true
			},
			input_email: {
				required: true,
				email: true
			},
			input_subject: {
				minlength: 3,
				required: true
			},
			input_message: {
				minlength: 10,
				required: true
			},
			input_captcha: {
				math: [3, 4]
			}
		},
		submitHandler: function(form) {
			var a=$('#form-comment').serialize();
			$.ajax({
				type: "POST",
				url: "comment_process.php",
				data:a,
				complete:function(){
				},
				beforeSend: function() {
				
				},
				success: function(data){
					
					if (data=='success') {
						$('#form-comment').find("input[type=text], textarea").val("");
						alert('Email has been successfully sent');
					} else {
						alert(data);
					}
				},
				error : function() {
				
				}
			});
			return false;
		}
	});
	
	//Tooltip
	$('.ul_social li a, a.link').tooltip();
});
