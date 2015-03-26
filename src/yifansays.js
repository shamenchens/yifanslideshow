(function($) {

  $.yifansays = function(options) {

    var settings = $.extend({
        source: 'https://spreadsheets.google.com/feeds/cells/149wA5vH2cOQWTjRthjutL5YmS_E6AZ6YcqwPihpSMsU/o6wgwqc/public/values?alt=json',
        image: [
          'https://raw.githubusercontent.com/shamenchens/yifanslideshow/gh-pages/img/yifan.png'
        ],
        height: 450, // image height
        width: 466, // image width
        effect: 'jump', // options: default, fast, slow, veryslow, jump, sneaky
        popup_effect: 'fade', // options: default, fade, slide, zoom
        popup_radius: '8px', // popup radius
        popup_color: 'black', // popup font color
        popup_bgcolor: 'beige', // popup background color
        readmore_color: 'brown', // popup font color
        comein_position: 80, // show kp after scroll more than percent of page height
        default_text: '一帆表示', // the words show in popup before loading done
        enter_from: 'left', // options: left, right
        enter_distance: -50 // the distance to window side

        //left: -130, // remove this option after ver2.0
    }, options);

    createYifan(settings);

    var container = $('#yifan_container'),
        yifan_image = $('#yifan_container img'),
        popup = $('#yifan_popup'),
        close = $('#yifan_close_popup');

    $(window).scroll(function(){
      var scroll = $(window).scrollTop(),
          window_h = $(window).height(),
          page_h = $(document).height(),
          come_in = {},come_out = {};
      come_in[settings.enter_from] = settings.enter_distance+'px';
      come_out[settings.enter_from] = '-'+(settings.width)+'px';

      if((scroll+window_h) > (page_h*(settings.comein_position/100))) {
        if(container.css(settings.enter_from) == '-'+settings.width+'px') {
          switch(settings.effect) {
            case 'fast':
              container.animate(come_in, 100, function() {
                popupIn(settings.popup_effect);
              });
              break;

            case 'slow':
              container.animate(come_in, 1000, function() {
                popupIn(settings.popup_effect);
              });
              break;

            case 'veryslow':
              container.animate(come_in, 10000, function() {
                popupIn(settings.popup_effect);
              });
              break;

            case 'jump':
              container
                .css('bottom','-'+settings.height+'px')
                .css(settings.enter_from,settings.enter_distance);
              container
                .animate({bottom: 0}, 300)
                .animate({bottom: '-10px'}, 50)
                .animate({bottom: 0}, 50)
                .animate({bottom: '-10px'}, 50)
                .animate({
                  bottom: 0
                }, 300, function() {
                  popupIn(settings.popup_effect);
                });
              break;

            case 'sneaky':
              var sneaky_pos1 = {},
                  sneaky_pos2 = {},
                  sneaky_pos3 = {};
              sneaky_pos1[settings.enter_from] = '-'+(settings.width*0.54)+'px';
              sneaky_pos2[settings.enter_from] = '-'+(settings.width*0.6)+'px';
              sneaky_pos3[settings.enter_from] = '-'+(settings.width*0.7)+'px';

              container
                .animate(sneaky_pos1, 2000).delay(2000)
                .animate(sneaky_pos2, 1000).delay(1000)
                .animate(sneaky_pos1, 1000).delay(2000)
                .animate(sneaky_pos3, 2000).delay(1000)
                .animate(come_in, 3000, function() {
                  popupIn(settings.popup_effect);
                });
              break;

            default:
              container.animate(
                come_in, 500, function() {
                  popupIn(settings.popup_effect);
              });
              break;
          }
        }
      }
      else {
        if(container.css(settings.enter_from) == settings.enter_distance+'px') {
          popup.hide();
          container.animate(come_out, 100);
          loadData(settings);
        }
      }
    });
    yifan_image.click(function(){
      var come_out_forever = {};
      come_out_forever[settings.enter_from] = '-'+(settings.width+10)+'px';
      popup.remove();
      container.animate(come_out_forever, 100);
    });
    close.click(function(){
      popup.hide();
      loadData(settings);
    });
  };

  function createYifan(settings){
    var img_src,arrow_pos;
    if($.isArray(settings.image)==true)
      img_src = settings.image[Math.floor(Math.random()*(settings.image.length))];
    else
      img_src = settings.image;
    if(settings.enter_from == 'left')
      arrow_pos = 'right';
    else
      arrow_pos = 'left';
    var object = '<div id="yifan_container" style="width:'+settings.width+'px; height:'+settings.height+'px; '+settings.enter_from+':-'+settings.width+'px; bottom:0;"><img src="'+img_src+'" style="width:'+settings.width+'px; height:'+settings.height+'px;"><div id="yifan_popup" style="'+settings.enter_from+':'+((settings.width)*0.9)+'px;top:'+(settings.height*0.5)+'px;-webkit-border-radius:'+settings.popup_radius+';-moz-border-radius:'+settings.popup_radius+';border-radius:'+settings.popup_radius+';background-color:'+settings.popup_bgcolor+'"><div id="yifan_says" style="color:'+settings.popup_color+'">'+settings.default_text+'<a href="#" target="_blank" class="yifan_readmore" style="color:'+settings.readmore_color+'">了解更多Yifan</a></div><div id="yifan_popup_arrow_shadow" style="border-'+arrow_pos+': 40px solid rgba(0,0,0,.1);'+settings.enter_from+': -40px;"></div><div id="yifan_popup_arrow" style="border-'+arrow_pos+': 42px solid '+settings.popup_bgcolor+';'+settings.enter_from+': -40px;"></div><div id="yifan_close_popup">X</div></div></div>';
    $('body').append(object);
    loadData(settings);
  }

  function loadData(settings){
    var says, talk, entry;
    $.getJSON(settings.source, function(data) {
      // Retrieve talks from google spreadsheet: http://goo.gl/6fLH21
      // We only need column B starting from row 2, so we can remove the first two cells,
      // which are the two cells in row 1, and filter out first cell in each row.
      entry = data.feed.entry.splice(2).filter(function(element, index) {
        return index % 2 === 1;
      });
      talk = entry[Math.floor(Math.random()*(entry.length))].content['$t'];
      says = '<p id="yifan_say_hi" style="color:'+settings.popup_color+'">'+settings.default_text+'<br>'+talk+'</p>';
    }).always(function() {
      $('#yifan_says').scrollTop(0).html(says).promise().done(function(){
        $('p').removeAttr("style"); $('span').removeAttr("style");
      });
    });
  }

  function popupIn(effect) {
    switch(effect) {

      case 'fade':
        $('#yifan_popup').fadeIn('slow');
        break;

      case 'slide':
        $('.yifan_readmore').hide(function(){
          $('#yifan_popup').slideDown('fast',function(){
            $('.yifan_readmore').fadeIn();
          });
        });
        break;

      case 'zoom':
        $('#yifan_says').hide(function(){
          $('#yifan_popup').show('slow',function(){
            $('#yifan_says').fadeIn();
          });
        });
        break;

      default:
        $('#yifan_popup').show();
        break;
    }
  }

}(jQuery));
