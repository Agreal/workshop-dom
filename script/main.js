(function() {
  document.addEventListener('DOMContentLoaded', ready);

  function ready() {
    var addBtnDom = document.querySelector('.add-resource');
    var resourceContainer = new ResourceContainer();

    var dialog = document.querySelector('.add-resource-dialog');
    var cancelBtn = document.querySelector('.cancel');
    var addBtn = document.querySelector('.add');
    var resourceInput = document.querySelector('.resource-input');

    addBtnDom.addEventListener('click', openAddResourceDialog);
    cancelBtn.addEventListener('click', closeAddResourceDialog);
    addBtn.addEventListener('click', appendResource);

    function openAddResourceDialog() {
      dialog.classList.remove('hide');
    }
    function closeAddResourceDialog() {
      dialog.classList.add('hide');
    }
    function appendResource() {
      var resources = getResources(resourceInput.value);
      var resourcesObj = toResourcesObj(resources, resourceContainer.remove.bind(resourceContainer));
      resourceContainer
        .addResources(resourcesObj)
        .render();
    }

    function getResources(resourceString) {
      return resourceString.split(',');
    }
    function toResourcesObj(resources, deleteResource) {
      return resources.map(function(label) {
        return new Resource(label, deleteResource);
      });
    }
  }

  function wrap(string) {
    var fake = document.createElement('div');
    fake.innerHTML = string;
    return fake.firstChild;
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

    window.Resource = Resource;
    window.ResourceContainer = ResourceContainer;
  })();
})();

