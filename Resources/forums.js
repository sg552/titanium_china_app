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
      }
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
  return win;
}

module.exports = Window;
