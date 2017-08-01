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
    resourceList.addEventListener('click', deleteResource);

    function openAddResourceDialog() {
      dialog.classList.remove('hide');
    }
    function closeAddResourceDialog() {
      dialog.classList.add('hide');
    }
    function appendResource() {
      var resources = getResources(resourceInput.value);
      var resourcesDom = toDoms(resources);
      appendChildren(resourceList, resourcesDom);
    }

    function getResources(resourceString) {
      return resourceString.split(',');
    }
    function toDoms(resources) {
      return resources.map(function(str) {
        return wrap('<li class="resource-item">' + str + '<span class="delete">X</span></li> ');
      });
    }
    function wrap(string) {
      var fake = document.createElement('div');
      fake.innerHTML = string;
      return fake.firstChild;
    }
    function appendChildren(parent, children) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < children.length; i++) {
        fragment.appendChild(children[i]);
      }
      parent.appendChild(fragment);
    }
    function deleteResource(e) {
      if (e.target.matches('.delete')) {
        var resourceItem = e.target.parentNode;
        resourceList.removeChild(resourceItem);
      }
    }

  }
})();

