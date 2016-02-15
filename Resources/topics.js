Window = function(data){
  var win = Ti.UI.createWindow({ })

  var my_template = {
    childTemplates:[
      {
        type: 'Ti.UI.Label',
        bindId: 'title',
        properties:{
          width: 300,
          height: 20,
          left: 0
        }
      },
      {
        type: 'Ti.UI.Label',
        bindId: 'user',
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

  var section = Ti.UI.createListSection({
    headerTitle: data.forum_name
  });
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
            html_body: temp.html_body,
            user: temp.user,
            created_at: temp.created_at
          });
        }
        // 把data 作为参数，传递到 topics.js 中去。
        data.posts = posts;
        require('posts')(data).open();
        win.close();
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
