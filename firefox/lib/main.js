var buttons = require('sdk/ui/button/action');
var pageMod = require('sdk/page-mod');
var tabs = require('sdk/tabs');
var self = require('sdk/self');

var button = buttons.ActionButton({
  id: 'mozilla-link',
  label: 'Visit Mozilla',
  icon: {
    '16': './icon-16.png',
    '32': './icon-32.png',
    '64': './icon-64.png'
  },
  onClick: handleClick
});

function handleClick(state) {
  tabs.open('http://www.efan.tw/about.html');
}

pageMod.PageMod({
  include: '*',
  contentStyleFile: self.data.url('yifansays.css'),
  contentScriptFile: [
    self.data.url('jquery-1.11.1.min.js'),
    self.data.url('yifansays.js')
  ],
  contentScript: '$.yifansays();'
});
