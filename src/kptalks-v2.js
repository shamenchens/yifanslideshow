(function($) {

  $.kptalks = function(options) {

    var settings = $.extend({
        image: 'http://unlimited.kptaipei.tw/images/kp.png',
        api: 'http://api.kptaipei.tw/v1/category/40?accessToken=kp53f568e77303e9.28212837',
        default_text: '你好，我是柯文哲',
        effect: 'default', // options: default, fast, slow, veryslow, jump, sneaky
        height: 450, // image height
        width: 466, //image width
        left: -130
    }, options);

    createKP(settings);

    var container = $('#kp_come_container'),
        kp_image = $('#kp_come_container img'),
        popup = $('#kp_popup'),
        close = $('#kx_close_popup');

    $(window).scroll(function(){
      var scroll = $(window).scrollTop(),
          window_h = $(window).height(),
          page_h = $(document).height();
      if((scroll+window_h) > (page_h*0.8)) {
        if(container.css('left') == '-'+settings.width+'px') {
          loadData(settings);
          switch(settings.effect) {
            case 'fast':
              container.animate({
                left: settings.left+'px'
              }, 100, function() {
                popup.show();
              });
              break;

            case 'slow':
              container.animate({
                left: settings.left+'px'
              }, 1000, function() {
                popup.show();
              });
              break;

            case 'veryslow':
              container.animate({
                left: settings.left+'px'
              }, 10000, function() {
                popup.show();
              });
              break;

            case 'jump':
              container
                .css('bottom','-'+settings.height+'px')
                .css('left',settings.left+'px');
              container
                .animate({bottom: 0}, 300)
                .animate({bottom: '-10px'}, 50)
                .animate({bottom: 0}, 50)
                .animate({bottom: '-10px'}, 50)
                .animate({
                  bottom: 0
                }, 300, function() {
                  popup.show();
                });
              break;

            case 'sneaky':
              container
                .animate({left: '-'+(settings.width*0.54)+'px'}, 2000).delay(2000)
                .animate({left: '-'+(settings.width*0.6)+'px'}, 1000).delay(1000)
                .animate({left: '-'+(settings.width*0.54)+'px'}, 1000).delay(2000)
                .animate({left: '-'+(settings.width*0.7)+'px'}, 2000).delay(1000)
                .animate({
                  left: settings.left+'px'
                }, 3000, function() {
                  popup.show();
                });
              break;

            default:
              container.animate({
                left: settings.left+'px'
              }, 500, function() {
                popup.show();
              });
              break;
          }
        }
      }
      else {
        if(container.css('left') == settings.left+'px') {
          popup.hide();
          container.animate({
            left: '-'+settings.width+'px'
          }, 100);
        }
      }
    });
    kp_image.click(function(){
      popup.hide();
      container.animate({
        left: '-'+(settings.width+10)+'px'
      }, 100);
    });
    close.click(function(){
      popup.hide();
    });
  };

  function createKP(settings){
    var object = '<div id="kp_come_container" style="width:'+settings.width+'px; height:'+settings.height+'px; left:-'+settings.width+'px; bottom:0;"><img src="'+settings.image+'" style="width:'+settings.width+'px; height:'+settings.height+'px;"><div id="kp_popup" style="left:'+((settings.width)*0.8)+'px;top:'+(settings.height*0.28)+'px;"><div id="kp_says">'+settings.default_text+'</div><div id="kp_popup_arrow_shadow"></div><div id="kp_popup_arrow"></div><div id="kx_close_popup">X</div></div></div>';
    $('body').append(object);
    loadData(settings);
  }

  function loadData(settings){
    var posts = {}, says;
    $.get(settings.api,function(results){
      var i = 0;
      $.each(results.data,function(ind,item){
        posts[i] = item; i++;
      });
      var post = posts[Math.floor(Math.random()*(i-1))]
          link = '<a href="'+post.url+'" target="_blank" class="kp_readmore">了解更多柯文哲的政見</a>';

      title = (post.title).replace(/【柯p新政】/g,"");
      content = stringReplace(post.content);
      content = content.split('</p>');
      if(content[1] == undefined)
        says = '<p id="kp_say_bighi">'+settings.default_text+'<br>我提出<br>「'+title.substring(2)+'」</p>'+link;
      else
        says = '<p id="kp_say_hi">'+settings.default_text+'</p>'+content[1]+'...'+link+'</p>';

      $('#kp_says').html(says).promise().done(function(){
        $('p').removeAttr("style"); $('span').removeAttr("style");
      });
    });
  }

  function stringReplace(string){
    return string.replace(/柯文哲/g,"我")
      .replace(/台北市長參選人/g,"")
      .replace(/我表示/g,"我認為")
      .replace(/我指出/g,"我認為");
  }

}(jQuery));
