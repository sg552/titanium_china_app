Window = function(data){
  var win = Ti.UI.createWindow({
    backgroundColor: 'white'
  });
  var wrapper = Ti.UI.createScrollView({
    layout: 'vertical'
  });
  for(var i = 0; i< data.posts.length; i++){
    temp_post = data.posts[i];
    var row = Ti.UI.createView({
      borderColor: i == 0 ? 'red' : 'blue',
      height: Ti.UI.SIZE
    });
    var html_body = Ti.UI.createWebView({
      left: 0,
      top: 40,
      html: temp_post.html_body,
      height: Ti.UI.SIZE,
      borderColor: 'yellow',
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
    row.add(html_body);
    row.add(user);
    row.add(created_at);
    console.info('== adding row: ' + i);
    wrapper.add(row);
  }
  win.add(wrapper);
  return win;
}

module.exports = Window;
