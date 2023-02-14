function productDetailController(app) {
  app.controller('productDetailController', [
    '$scope',
    '$routeParams',
    '$rootScope',
    'productService',
    function ($scope, $routeParams, $rootScope, productService) {
      $scope.product = $rootScope.products.find((item) => item.id == $routeParams.id);
      $scope.quantity = 1;
      $scope.handleIncreaseQuantity = () => {
        $scope.quantity++;
      };
      $scope.handleDecreaseQuantity = () => {
        if ($scope.quantity > 1) {
          $scope.quantity--;
        }
      };

      $scope.addToCartWithQuantity = (product) => {
        productService.addProduct(product, $scope.quantity);
      };

      $scope.addProduct = (product) => {
        productService.addProduct(product);
      };
    },
  ]);
}

export default productDetailController;
