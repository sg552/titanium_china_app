Window = function(data){
  var win = Ti.UI.createWindow({
    backgroundColor: 'white'
  });


  var table_data = []
  for(var i = 0; i< data.posts.length; i++){
    temp_post = data.posts[i];
    var row = Ti.UI.createTableViewRow({
      borderColor: i == 0 ? 'red' : 'blue',
      height: Ti.UI.SIZE
    });
    var body = Ti.UI.createLabel({
      left: 0,
      top: 40,
      text: temp_post.body,
      height: Ti.UI.SIZE,
      borderColor: 'red',
      borderWidth: 3

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
    console.info('== adding row: ' + i);
    table_data.push(row);
  }

  var table_view = Ti.UI.createTableView({
    backgroundColor: 'white',
    data: table_data
  });

  win.add(table_view);
  return win;
}

module.exports = Window;
