var img_source = 'http://unlimited.kptaipei.tw/images/kp.png',
    api_source = 'http://api.kptaipei.tw/v1/category/40?accessToken=kp53f568e77303e9.28212837',
    slide_effect = 'default', // 可選設定：default, fast, slow, veryslow, jump, sneaky
    kp_height = 450, // 圖片高度
    kp_width = 466, // 圖片寬度
    kp_left_distance  = -130, // 滑入後的 left
    default_text = '你好，我是柯文哲',
    posts = {},
    kp_says,
    kp = '<div id="kp_come_container" style="width:'+kp_width+'; height:'+kp_height+'px; position:fixed; left:-'+kp_width+'px; bottom:0;"><img src="'+img_source+'" style="width:100%; height:100%;"><div id="kp_popup" style="padding: 20px; width: 300px; height:140px; position: absolute;left:'+(kp_width*0.8)+'px;top:'+(kp_height*0.28)+'px;-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;-webkit-box-shadow: rgba(0,0,0,.4) 0px 1px 5px -1px;box-shadow: rgba(0,0,0,.4) 0px 1px 5px -1px; background-color:beige;display:none;"><div id="kp_says" style="text-align:center;font-size:18px;line-height:26px;">'+default_text+'</div><div style="width: 0px;height: 0px;border-top-width: 15px;border-top-style: solid;border-top-color: transparent;border-bottom-width: 15px;border-bottom-style: solid;border-bottom-color: transparent;border-right-width: 40px;border-right-style: solid;border-right-color: rgba(0,0,0,.4);position: absolute;left: -40px;top:30%;"></div><div style="width: 0px;height: 0px;border-top-width: 15px;border-top-style: solid;border-top-color: transparent;border-bottom-width: 15px;border-bottom-style: solid;border-bottom-color: transparent;border-right-width: 42px;border-right-style: solid;border-right-color: beige;position: absolute;left: -40px;top:29.8%;"></div><div id="kx_close_popup">X</div></div></div><style>html,body{height:100%;}#kp_come_container #kp_popup{-webkit-box-sizing: initial;-moz-box-sizing: initial;box-sizing: initial;}#kp_come_container #kp_says {height:140px;overflow-y:auto;text-algin:center;-webkit-box-sizing: initial;-moz-box-sizing: initial;box-sizing: initial;}#kp_come_container #kp_says p,#kp_come_container #kp_says span {padding:0;margin:0;font-size:18px;line-height:26px;}#kp_come_container #kp_say_hi{padding:0;margin:0;font-size:18px;line-height:26px;padding-bottom:5px;display:block;}#kp_come_container #kp_says #kp_say_bighi{font-size:22px;font-weight:bold;line-height:32px;}#kp_come_container #kx_close_popup{position:absolute;right:10px;top:8px;cursor:pointer;color:#aaa;}</style>';

$('body').append(kp);
$.get(api_source,function(results){
  var i = 0;
  $.each(results.data,function(ind,item){
    posts[i] = item;
    i++;
  });
  var post = posts[Math.floor(Math.random()*(i-1))],
      post_title = post.title,
      post_content = post.content,
      post_url = post.url,
      kp_link = '<a href="'+post_url+'" target="_blank" style="color:brown;padding-top:10px;display:block;">了解更多柯文哲的政見</a>';

  post_title = post_title.replace(/【柯p新政】/g,"");
  post_content = post_content
    .replace(/柯文哲/g,"我")
    .replace(/台北市長參選人/g,"")
    .replace(/我表示/g,"我認為")
    .replace(/我指出/g,"我認為");
  post_content = post_content.split('</p>');
  if(post_content[1] == undefined)
    kp_says = '<p id="kp_say_bighi">您好，我是柯文哲<br>我提出<br>「'+post_title.substring(2)+'」</p>'+kp_link;
  else
    kp_says = '<p id="kp_say_hi">您好，我是柯文哲</p>'+post_content[1]+'...'+kp_link+'</p>';
  $('#kp_says').html(kp_says).promise().done(function(){
    $('p').removeAttr("style");
    $('span').removeAttr("style");
  });
});
$(window).scroll(function(){
  var scroll = $(window).scrollTop();
  var window_h = $(window).height();
  var page_h = $(document).height();

  if((scroll+window_h) > (page_h*0.8)) {
    if($('#kp_come_container').css('left') == '-'+kp_width+'px') {
      switch(slide_effect) {
        //default, fast, slow, veryslow, jump, sneaky

        case 'fast':
          $('#kp_come_container').animate({
            left: kp_left_distance+'px'
          }, 100, function() {
            $('#kp_popup').show();
          });
          break;

        case 'slow':
          $('#kp_come_container').animate({
            left: kp_left_distance+'px'
          }, 1000, function() {
            $('#kp_popup').show();
          });
          break;

        case 'veryslow':
          $('#kp_come_container').animate({
            left: kp_left_distance+'px'
          }, 10000, function() {
            $('#kp_popup').show();
          });
          break;

        case 'jump':
          $('#kp_come_container').css('bottom','-'+kp_height+'px').css('left',kp_left_distance+'px');
          $('#kp_come_container')
          .animate({bottom: 0}, 300)
          .animate({bottom: '-10px'}, 50)
          .animate({bottom: 0}, 50)
          .animate({bottom: '-10px'}, 50)
          .animate({
            bottom: 0
          }, 300, function() {
            $('#kp_popup').show();
          });
          break;

        case 'sneaky':
          $('#kp_come_container')
          .animate({left: '-'+(kp_width*0.54)+'px'}, 2000).delay(2000)
          .animate({left: '-'+(kp_width*0.6)+'px'}, 1000).delay(1000)
          .animate({left: '-'+(kp_width*0.54)+'px'}, 1000).delay(2000)
          .animate({left: '-'+(kp_width*0.7)+'px'}, 2000).delay(1000)
          .animate({
            left: kp_left_distance+'px'
          }, 3000, function() {
            $('#kp_popup').show();
          });
          break;

        default:
          $('#kp_come_container').animate({
            left: kp_left_distance+'px'
          }, 500, function() {
            $('#kp_popup').show();
          });
          break;
      }
    }
  }
  else {
    if($('#kp_come_container').css('left') == kp_left_distance+'px') {
      $('#kp_popup').hide();
      $('#kp_come_container').animate({
        left: '-'+kp_width+'px'
      }, 100, function() {
      });
    }
  }
});
$('#kp_come_container img').click(function(){
  $('#kp_popup').hide();
  $('#kp_come_container').animate({
    left: '-'+(kp_width+10)+'px'
  }, kp_slide_speed, function() {
  });
});
$('#kx_close_popup').click(function(){
  $('#kp_popup').hide();
});
