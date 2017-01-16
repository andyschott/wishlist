window.client = function() {
  var self = {
    'addItemToDom' : function(item) {
      var li = document.createElement('li');
      li.id = 'item' + item.id;
      li.dataset.name = item.name;
      li.dataset.priority = item.priority;

      var span = document.createElement('span');
      span.innerText = item.name + '(Priority ' + item.priority + ')';
      li.appendChild(span);
      li.appendChild(document.createElement('br'));

      var em = document.createElement('em');
      em.className = 'comment';
      em.innerText = item.comment;
      li.appendChild(em);
      li.appendChild(document.createElement('br'));

      var a = document.createElement('a');
      a.href = 'javascript:client.startEditItem(' + item.id + ')';
      a.innerText = 'Edit';
      li.appendChild(a);

      a = document.createElement('a');
      a.href = 'javascript:client.deleteItem(' + item.id + ')';
      a.innerText = 'Delete';
      li.appendChild(a);

      var ulItems = document.getElementById('items');
      ulItems.appendChild(li);
    }
  };

  return {
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
      var item = {
        'id' : parseInt(document.getElementById('editId').value),
        'name' : document.getElementById('editName').value,
        'priority' : parseInt(document.getElementById('editPriority').value),
        'comment' : document.getElementById('editComment').value
      };

      var req = new XMLHttpRequest();
      req.open('PUT', '/api/v1/items/' + item.id);
      req.setRequestHeader('Content-Type', 'application/json');
      req.onload = function() {
        var updatedItems = JSON.parse(this.response);
        var updatedItem = updatedItems[0];

        var oldLi = document.getElementById('item' + updatedItem.id);
        oldLi.remove();

        self.addItemToDom(updatedItem);

        var editor = document.getElementById('editor');
        editor.style = '';
      };
      req.send(JSON.stringify(item));
    }
  };
}();
