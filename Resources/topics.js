Window = function(data){
  var win = Ti.UI.createWindow({
    backgroundColor: 'white'
  })

  var navigation = Ti.App.navigation_window({
    title: '话题列表',
    back_function: function(){
      win.close();
    }
  });
  win.add(navigation);

  var my_template = {
    childTemplates:[
      {
        type: 'Ti.UI.Label',
        bindId: 'title',
        properties:{
          width: 300,
          height: 20,
          left: 0,
          top: 0,
          color: 'black'
        }
      },
      {
        type: 'Ti.UI.Label',
        bindId: 'user',
        properties: {
          width: 300,
          height: 40,
          top: 20,
          left: 0,
          color: 'black'
        }
      },
    ],
    properties: {
      height: Ti.UI.SIZE
    }

  }

  var list_view = Ti.UI.createListView({
    templates: { 'template': my_template },
    defaultItemTemplate: 'template',
    top: 60,
    separatorColor: '#d9d9d9'
  });

  var sections = [];

  var section = Ti.UI.createListSection({ });
  section.setItems(data.topics);
  sections.push(section);
  list_view.setSections(sections);
  win.add(list_view);

  list_view.addEventListener('itemclick', function(e){
    topic_id = data.topics[e.itemIndex].topic_id;
    url = 'http://tidev.in/interface/posts?topic_id=' + topic_id;
    var http = Ti.Network.createHTTPClient({
      onload: function(e){
        var response = JSON.parse(this.responseText);

        // 设置好data的格式。
        var data = {
          topic_title : response.title
        }
        posts = []
        for(i = 0; i < response.posts.length; i++){
          temp = response.posts[i];
          posts.push({
            body: temp.body,
            user: temp.user,
            created_at: temp.created_at
          });
        }
        // 把data 作为参数，传递到 topics.js 中去。
        data.posts = posts;
        require('posts')(data).open();
      },
      onerror: function(e){
        console.error("== " + e);
        console.error(JSON.stringify(e));
        alert('网络不好' + e);
      }
    });
    http.open('GET', url);
    http.send();
  });

  return win;
}

module.exports = Window;
