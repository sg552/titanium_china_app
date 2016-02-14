Titanium.UI.setBackgroundColor('#000');

var window = Ti.UI.createWindow({});

var http = Ti.Network.createHTTPClient({
  onload: function(e){
    console.info("=== " + JSON.stringify(e));
    var response = JSON.parse(this.responseText);
    // 这里不能用 require('forums.js');
    //var Forum = require('forums');
    //new Forum().open();
    require('forums')().open();
  },
  onerror: function(e){
    alert('网络不好' + e);
  }
});

http.open('GET', 'http://tidev.in/interface/forums');
http.send();
