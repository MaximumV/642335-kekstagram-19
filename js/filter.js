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

  var setActiveFilter = window.debounce(function (filter) {
    var filteredPicturesData = window.picturesData.slice();

    var active = filtersContainer.querySelector('.' + ACTIVE_CLASS);
    active.classList.remove(ACTIVE_CLASS);
    filter.classList.add(ACTIVE_CLASS);

    switch (filter) {
      case filterRandom:
        filteredPicturesData.sort(function () {
          return window.random.getNumber(0, 1) - 0.5;
        })
        .splice(0, filteredPicturesData.length - COUNT_RANDOM_FOTO);
        break;
      case filterDiscussed:
        filteredPicturesData.sort(function (left, right) {
          return right.comments.length - left.comments.length;
        });
        break;
    }
    window.gallery.show(filteredPicturesData);
  });


  window.filter = {
    init: initFilters
  };

})();
