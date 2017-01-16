window.client = function() {
  var self = {
    'deleteItem' : function(itemId) {
      var req = new XMLHttpRequest();
      req.open('DELETE', '/api/v1/items/' + itemId);
      req.onload = function() {
        var deletedItem = document.getElementById('item' + itemId);
        deletedItem.remove();
        // var items = document.getElementById('items');
      };
      req.send();
    },

    'startEditItem' : function(itemId) {
      var itemNode = document.getElementById('item' + itemId);
      var commentNode = document.getElementsByClassName('comment')[0];
      var item = {
        'id' : itemId,
        'name' : itemNode.dataset.name,
        'priority' : itemNode.dataset.priority,
        'comment' : commentNode.innerText
      };

      var editor = document.getElementById('editor');
      document.getElementById('editName').value = item.name;
      document.getElementById('editPriority').value = item.priority;
      document.getElementById('editComment').value = item.comment;
      document.getElementById('editId').value = item.id;
      editor.style = 'display: block;';
    },

    'editItem' : function() {
      // var req = new XMLHttpRequest();
      // req.open('PUT', '/avpi/v1/items/' + itemId);
      // req.onload = function() {

      // };
      // req.send();
    }
  }

  return self;
}();
