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
    }
  }

  return self;
}();
