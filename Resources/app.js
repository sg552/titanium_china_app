Titanium.UI.setBackgroundColor('#000');

require('public');
var window = Ti.UI.createWindow({});

var http = Ti.Network.createHTTPClient({
  onload: function(e){
    var response = JSON.parse(this.responseText);

    // 设置好data的格式。
    var data = []
    for(i = 0; i < response.length; i++){
      data.push({
        forum_name: { text: response[i].name},
        forum_description: { text: response[i].description },
        // 这个forum_id 不需要放到ListView中，
        // 所以不需要再设置一个 { text: ... }
        forum_id: response[i].id
      });
    }
    // 把data 作为参数，传递到 forum.js 中去。

    require('forums')(data).open();
  },
  onerror: function(e){
    alert('网络不好' + e);
  }
});

http.open('GET', 'http://tidev.in/interface/forums');
http.send();
