// 分页
module.exports = function (directives) {

  angular.module(directives).directive('pagination', PaginationDirective);

  function PaginationDirective() {
    return {
      restrict: 'EA',
      scope: {
        current: '=',
        size: '=',
        total: '=',
        align: '=',
        changed: '&',
        steps: '='
      },
      controller: PaginationController,
      template: [
        '<div layout="row" layout-align="{{ align }}" layout-wrap>',
        '<md-button class="md-fab md-raised md-mini" aria-label="First" ng-click="gotoFirst()"><md-tooltip>首页</md-tooltip><md-icon>first_page</md-icon></md-button>',
        '<md-button class="md-fab md-raised md-mini" aria-label="Previous" ng-click="gotoPrev()" ng-show="index - 1 >= 0"><md-tooltip>上一页</md-tooltip>···</md-button>',
        '<md-button class="md-fab md-mini" aria-label="Go to page {{i+1}}" ng-repeat="i in stepInfo" ng-click="goto(index + i)" ng-show="page[index + i]" ng-class="{\'md-raised\': page[index + i] != current}">{{ page[index + i] }}</md-button>',
        '<md-button class="md-fab md-raised md-mini" aria-label="Next" ng-click="gotoNext()" ng-show="index + steps < pages"><md-tooltip>下一页</md-tooltip>···</md-button>',
        '<md-button class="md-fab md-raised md-mini" aria-label="Last" ng-click="gotoLast()"><md-tooltip>尾页</md-tooltip><md-icon>last_page</md-icon></md-button>',
        '</div>'
      ].join('')
    };
  }

  PaginationController.$inject = ['$scope'];

  function PaginationController($scope) {
    // $scope.first = '<md-icon>navigate_before</md-icon>';
    // $scope.last = '<md-icon>navigate_next</md-icon>';
    $scope.index = 0;
    $scope.pages = 0;
    // $scope.steps = $scope.steps;

    $scope.goto = function (index) {
      $scope.current = $scope.page[index];
    };

    $scope.gotoPrev = function () {
      $scope.current = $scope.index;
      $scope.index -= $scope.steps;
    };

    $scope.gotoNext = function () {
      $scope.index += $scope.steps;
      $scope.current = $scope.index + 1;
    };

    $scope.gotoFirst = function () {
      $scope.index = 0;
      $scope.current = 1;
    };

    $scope.gotoLast = function () {
      $scope.index = parseInt($scope.pages / $scope.steps) * $scope.steps;
      $scope.index === $scope.pages ? $scope.index = $scope.index - $scope.steps : '';
      $scope.current = $scope.pages;
    };

    $scope.$watch('current', function (value) {
      debugger
      $scope.index = parseInt((value - 1) / $scope.steps) * $scope.steps;
      $scope.changed();
    });

    $scope.$watch('pages', function () {
      $scope.init();
    });

    $scope.init = function () {
      $scope.stepInfo = (function () {
        var result = [];
        for (var i = 0; i < $scope.steps; i++) {
          result.push(i)
        }
        return result;
      })();

      $scope.pages = Math.ceil($scope.total / $scope.size);

      $scope.page = (function () {
        var result = [];
        for (var i = 1; i <= $scope.pages; i++) {
          result.push(i);
        }
        return result;
      })();
    };
  };
};