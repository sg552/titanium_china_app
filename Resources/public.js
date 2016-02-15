/*
 * Ti.App.navigation_window({
 *  title: '窗口的名字',
 *  back_function: function(){
 *    win.close();
 *    require('topics')().open();
 *  }
 * })
 *
 */
Ti.App.navigation_window = function(options){
  var title = Ti.UI.createLabel({
    text: options.title,
    center: 0,
    font: {
      fontSize: 25
    },
    color: 'black'
  })
  var back = Ti.UI.createButton({
    title: "返回",
    color: 'blue',
    font: 20,
    left: 0
  })
  var view = Ti.UI.createView({
    backgroundColor: 'white',
    height: 40,
    top: 20,
    left: 0
  })

  view.add(title);
  if(options.back_function){
    back.addEventListener('click', options.back_function)
    view.add(back);
  }
  return view;
}

