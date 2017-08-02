(function() {
  document.addEventListener('DOMContentLoaded', ready);

  function ready() {
    var addBtnDom = document.querySelector('.add-resource');
    var resourceList = document.querySelector('.resources');

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
      var resourcesObj = toResourcesObj(resources, deleteResourceFN);
      appendResources(resourceList, resourcesObj);

      function deleteResourceFN(e, resourceObj) {
        resourceList.removeChild(resourceObj.dom);
      }
    }

    function getResources(resourceString) {
      return resourceString.split(',');
    }
    function toResourcesObj(resources, deleteResource) {
      return resources.map(function(label) {
        return new Resource(label, deleteResource);
      });
    }
    function appendResources(parent, resources) {
      var fragment = document.createDocumentFragment();
      resources.forEach(function(resource) {
        fragment.appendChild(resource.dom);
      });
      parent.appendChild(fragment);
    }
  }

  function wrap(string) {
    var fake = document.createElement('div');
    fake.innerHTML = string;
    return fake.firstChild;
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

    window.Resource = Resource;
  })();
})();

