import app from '../../index.js';

app.controller('headerSlideController', function ($scope, $rootScope) {
  $scope.products = $rootScope.products;
});
