(function() {
  document.addEventListener('DOMContentLoaded', ready);

  function ready() {
    var agentItem = document.querySelector('.agent-item');
    var addBtnDom = document.querySelector('.add-resource');

    var resourceContainer = new ResourceContainer();
    var popover = new Popover()
      .onAdd(function() {
        var resources = this.getResourceValue();
        var resourcesList = toResourceList(resources, resourceContainer.remove.bind(resourceContainer));
        resourceContainer
          .addResources(resourcesList)
          .render();
      })
      .onClose(function() {
        agentItem.removeChild(this.dom);
      });


    addBtnDom.addEventListener('click', function() {
      agentItem.appendChild(popover.dom);
    });

    function toResourceList(resources, deleteResource) {
      return resources.map(function(label) {
        return new Resource(label, deleteResource);
      });
    }
  }

  function wrap(string) {
    var fake = document.createElement('div');
    fake.innerHTML = string;
    return fake.firstElementChild;
  }
  function appendChildren(parent, children) {
    var fragment = document.createDocumentFragment();
    children.forEach(function(resource) {
      fragment.appendChild(resource.dom);
    });
    parent.appendChild(fragment);
  }

  (function() {
    function Resource(label, deleteAction) {
      this.dom = wrap('<li class="resource-item">' + label + '<span class="delete">X</span></li> ');

      var self = this;
      var delBtn = this.dom.querySelector('.delete');

      delBtn.addEventListener('click', deleteFN);
      function deleteFN(e) {
        e.stopPropagation();
        delBtn.removeEventListener('click', deleteFN);
        deleteAction(e, self);
      }
    }

    function ResourceContainer() {
      this.dom = document.querySelector('.resources');
      this.resources = [];
    }
    ResourceContainer.prototype.addResources = function(resources) {
      this.resources = resources;
      return this;
    };
    ResourceContainer.prototype.render = function() {
      appendChildren(this.dom, this.resources)
      return this;
    };
    ResourceContainer.prototype.remove = function(e, resource) {
      this.dom.removeChild(resource.dom);
      return this;
    };

    function Popover() {
      this.dom = wrap(this.template);
      this.input = this.dom.querySelector('input');
      this.addBtn = this.dom.querySelector('.add');
      this.cancelBtn = this.dom.querySelector('.cancel');
    }
    Popover.prototype.getResourceValue = function() {
      return this.input.value.split(',');
    };
    Popover.prototype.onAdd = function(addHandle) {
      var self = this;
      this.addBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        addHandle.call(self, e);
      });
      return this;
    };
    Popover.prototype.onClose = function(closeHandle) {
      var self = this;
      this.cancelBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        closeHandle.call(self, e);
      });
      return this;
    };
    Popover.prototype.template = '\
      <div class="popover">\
        <input class="resource-input" type="text" value="aaa,bbb">\
        <button class="btn btn-primary add" type="button">Add</button>\
        <button class="btn btn-default cancel" type="button">Cancel</button>\
      </div>';

    window.Popover = Popover;
    window.Resource = Resource;
    window.ResourceContainer = ResourceContainer;
  })();
})();
