Window = function(){
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
      }
    ]
  }

  var list_view = Ti.UI.createListView({
    templates: { 'template': my_template },
    defaultItemTemplate: 'template'
  });

  var sections = [];

  var section = Ti.UI.createListSection();
  var data = [
    {
      forum_name: { text: '论坛1'} ,
      forum_description: { text: '1号论坛的描述' }
    },
    {
      forum_name: { text: '论坛2'} ,
      forum_description: { text: '2号论坛的描述' }
    }
  ]
  section.setItems(data);
  sections.push(section);
  list_view.setSections(sections);
  win.add(list_view);
  return win;
}

module.exports = Window;
