Titanium.UI.setBackgroundColor('#000');

var window = Ti.UI.createWindow({});

var http = Ti.Network.createHTTPClient({
  onload: function(e){
    var response = JSON.parse(this.responseText);
    var data = []
    for(i = 0; i < response.length; i++){
      data.push({
        forum_name: { text: response[i].name},
        forum_description: { text: response[i].description }
      });
    }
    require('forums')(data).open();
  },
  onerror: function(e){
    alert('网络不好' + e);
  }
});

http.open('GET', 'http://tidev.in/interface/forums');
http.send();
