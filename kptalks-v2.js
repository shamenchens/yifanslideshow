(function($) {
  $.kptalks = function(options) {

    var settings = $.extend({
        img_source: 'http://unlimited.kptaipei.tw/images/kp.png',
        api_source: 'http://api.kptaipei.tw/v1/category/40?accessToken=kp53f568e77303e9.28212837',
        default_text: '你好，我是柯文哲',
        effect: 'default', // options: default, fast, slow, veryslow, jump, sneaky
        height: 450, // image height
        width: 466, //image width
        left: -130,
    }, options);

    var posts = {},
        kp_says;

    var object = '<div id="kp_come_container" style="width:'+settings.width+'; height:'+settings.height+'px; left:-'+settings.width+'px; bottom:0;"><img src="'+settings.img_source+'"><div id="kp_popup" style="left:'+((settings.width)*0.8)+'px;top:'+(settings.height*0.28)+'px;"><div id="kp_says">'+settings.default_text+'</div><div id="kp_popup_arrow_shadow"></div><div id="kp_popup_arrow"></div><div id="kx_close_popup">X</div></div></div>';

    return $('body').append(object);

  };
}(jQuery));
/*

  $.get(settings.api_source,function(results){
    var i = 0;
    $.each(results.data,function(ind,item){
      posts[i] = item;
      i++;
    });
    var post = posts[Math.floor(Math.random()*(i-1))]
        link = '<a href="'+post.url+'" target="_blank" style="color:brown;padding-top:10px;display:block;">了解更多柯文哲的政見</a>';

    post_title = (post.title).replace(/【柯p新政】/g,"");
    post_content = post.content
      .replace(/柯文哲/g,"我")
      .replace(/台北市長參選人/g,"")
      .replace(/我表示/g,"我認為")
      .replace(/我指出/g,"我認為");
    post_content = post_content.split('</p>');
    if(post_content[1] == undefined)
      kp_says = '<p id="kp_say_bighi">您好，我是柯文哲<br>我提出<br>「'+post_title.substring(2)+'」</p>'+link;
    else
      kp_says = '<p id="kp_say_hi">您好，我是柯文哲</p>'+post_content[1]+'...'+link+'</p>';
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
      if($('#kp_come_container').css('left') == '-'+settings.width+'px') {
        switch(settings.effect) {
          case 'fast':
            $('#kp_come_container').animate({
              left: settings.left+'px'
            }, 100, function() {
              $('#kp_popup').show();
            });
            break;

          case 'slow':
            $('#kp_come_container').animate({
              left: settings.left+'px'
            }, 1000, function() {
              $('#kp_popup').show();
            });
            break;

          case 'veryslow':
            $('#kp_come_container').animate({
              left: settings.left+'px'
            }, 10000, function() {
              $('#kp_popup').show();
            });
            break;

          case 'jump':
            $('#kp_come_container').css('bottom','-'+kp_height+'px').css('left',settings.left+'px');
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
              left: settings.left+'px'
            }, 3000, function() {
              $('#kp_popup').show();
            });
            break;

          default:
            $('#kp_come_container').animate({
              left: settings.left+'px'
            }, 500, function() {
              $('#kp_popup').show();
            });
            break;
        }
      }
    }
    else {
      if($('#kp_come_container').css('left') == settings.left+'px') {
        $('#kp_popup').hide();
        $('#kp_come_container').animate({
          left: '-'+settings.width+'px'
        }, 100, function() {
        });
      }
    }
  });
  $('#kp_come_container img').click(function(){
    $('#kp_popup').hide();
    $('#kp_come_container').animate({
      left: '-'+(settings.width+10)+'px'
    }, 100, function() {
    });
  });
  $('#kx_close_popup').click(function(){
    $('#kp_popup').hide();
  });

    };
  };
}(jQuery));
*/
