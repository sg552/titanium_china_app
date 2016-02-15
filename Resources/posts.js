Window = function(data){
  var win = Ti.UI.createWindow({
    backgroundColor: 'white'
  });

  var navigation = Ti.App.navigation_window({
    title: '帖子详情',
    back_function: function(){
      win.close();
    }
  });
  win.add(navigation);

  var table_data = []
  for(var i = 0; i< data.posts.length; i++){
    temp_post = data.posts[i];
    var row = Ti.UI.createTableViewRow({
      height: Ti.UI.SIZE
    });
    var body = Ti.UI.createLabel({
      left: 0,
      top: 40,
      text: temp_post.body,
      height: Ti.UI.SIZE,
      backgroundColor: '#fafafa'
    });

    var user = Ti.UI.createLabel({
      text: temp_post.user,
      height: 20,
      left: 0,
      top: 20
    });
    var created_at = Ti.UI.createLabel({
      text: temp_post.created_at,
      height: 20,
      left: 100,
      top: 20
    });
    row.add(body);
    row.add(user);
    row.add(created_at);

    table_data.push(row);
  }

  var table_view = Ti.UI.createTableView({
    backgroundColor: 'white',
    top: 60,
    data: table_data
  });

  win.add(table_view);
  return win;
}

module.exports = Window;
