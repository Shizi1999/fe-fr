function productDetailController(app) {
  app.controller('productDetailController', [
    '$scope',
    '$routeParams',
    '$rootScope',
    function ($scope, $routeParams, $rootScope) {
      $scope.product = $rootScope.products.find((item) => item.id == $routeParams.id);
    },
  ]);
}

export default productDetailController;
