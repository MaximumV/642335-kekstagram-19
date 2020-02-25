'use strict';

(function () {

  var COUNT_RANDOM_FOTO = 10;
  var ACTIVE_CLASS = 'img-filters__button--active';

  var filtersContainer = document.querySelector('.img-filters.container');
  var filterDefault = filtersContainer.querySelector('#filter-default');
  var filterRandom = filtersContainer.querySelector('#filter-random');
  var filterDiscussed = filtersContainer.querySelector('#filter-discussed');


  var initFilters = function () {
    var filters = filtersContainer.querySelectorAll('.img-filters__button');
    filtersContainer.classList.remove('img-filters--inactive');
    setActiveFilter(filterDefault);

    filters.forEach(function (filter) {
      filter.addEventListener('click', function () {
        setActiveFilter(filter);
      });
    });
  };

  var setActiveFilter = function (filter) {
    var active = filtersContainer.querySelector('.' + ACTIVE_CLASS);
    active.classList.remove(ACTIVE_CLASS);
    filter.classList.add(ACTIVE_CLASS);

    switch (filter) {
      case filterRandom:
        window.gallery.show(window.picturesData.slice(0, COUNT_RANDOM_FOTO));
        break;
      case filterDiscussed:
        window.gallery.show(window.picturesData.slice()
          .sort(function (left, right) {
            return right.comments.length - left.comments.length;
          })
        );
        break;
      default:
        window.gallery.show(window.picturesData.slice());
    }
  };


  window.filter = {
    init: initFilters
  };

})();
