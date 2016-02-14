Window = function(data){
  var win = Ti.UI.createWindow({ })

  var my_template = {
    childTemplates:[
      {
        type: 'Ti.UI.Label',
        bindId: 'forum_name',
        properties:{
          width: 300,
          height: 20,
          left: 0
        }
      },
      {
        type: 'Ti.UI.Label',
        bindId: 'forum_description',
        properties: {
          width: 300,
          height: 40,
          top: 20,
          left: 0
        }
      },
    ]
  }

  var list_view = Ti.UI.createListView({
    templates: { 'template': my_template },
    defaultItemTemplate: 'template'
  });

  var sections = [];

  var section = Ti.UI.createListSection();
  section.setItems(data);
  sections.push(section);
  list_view.setSections(sections);
  win.add(list_view);

  list_view.addEventListener('itemclick', function(e){
    forum_id = data[e.itemIndex].forum_id
    url = 'http://tidev.in/interface/topics?forum_id=' + forum_id;
    var http = Ti.Network.createHTTPClient({
      onload: function(e){
        var response = JSON.parse(this.responseText);

        // 设置好data的格式。
        var data = {
          forum_name: response.forum_name
        }

        topics = []
        for(i = 0; i < response.topics.length; i++){
          temp = response.topics[i];
          topics.push({
            title: { text: temp.title},
            user: { text: temp.user},
            // 这个topic_id不需要放到ListView中，
            // 所以不需要再设置一个 { text: ... }
            topic_id: temp.topic_id,
          });
        }

        data.topics = topics;
        // 把data 作为参数，传递到 topics.js 中去。
        require('topics')(data).open();
      },
      onerror: function(e){
        alert('网络不好' + e);
      }
    });

    http.open('GET', url);
    http.send();
  });

  return win;
}

module.exports = Window;
