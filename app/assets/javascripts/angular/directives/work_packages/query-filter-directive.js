angular.module('openproject.workPackages.directives')

.directive('queryFilter', ['WorkPackagesTableHelper', 'WorkPackageService', 'WorkPackageLoadingHelper', 'QueryService', 'PaginationService', 'I18n', function(WorkPackagesTableHelper, WorkPackageService, WorkPackageLoadingHelper, QueryService, PaginationService, I18n) {

  return {
    restrict: 'A',
    link: function(scope, element, attributes) {

      scope.showValueOptionsAsSelect = ['list', 'list_optional', 'list_status', 'list_subprojects', 'list_model'].indexOf(scope.query.getFilterType(scope.filter.name)) !== -1;

      if (scope.showValueOptionsAsSelect) {
        QueryService.getAvailableFilterValues(scope.filter.name, scope.projectIdentifier)
          .then(buildOptions)
          .then(addStandardOptions)
          .then(function(options) {
            scope.availableFilterValues = options;
          });
      }

      // Filter updates

      scope.$watch('filter.operator', function(operator) {
        if(operator) scope.showValuesInput = scope.filter.requiresValues();
      });

      scope.$watch('filter', function(filter, oldFilter) {
        if (filter !== oldFilter) {
          if (filter.isConfigured()) {
            scope.query.hasChanged();
            PaginationService.resetPage();

            applyFiltersWithDelay();
          }
        }
      }, true);

      function applyFiltersWithDelay() {
        return WorkPackageLoadingHelper.withDelay(800, scope.updateResults);
      }

      function buildOptions(values) {
        return values.map(function(value) {
          return [value.name, value.id];
        });
      }

      function addStandardOptions(options) {
        if (scope.filter.getModelName() === 'user') {
          options.unshift(['<< ' + scope.I18n.t('js.label_me') + ' >>', 'me']);
        }

        return options;
      }
    }
  };
}]);
