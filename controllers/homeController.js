function homeController(app) {
  app.controller('homeController', function ($scope, $rootScope, productService) {
    $scope.products = $rootScope.products;
    $scope.activeCategory = 0;
    $scope.filterProduct = {};
    $scope.searchProducts = [];
    $scope.searchValue = '';
    $scope.dirtyInput = false;

    $scope.limit = 8;
    $scope.begin = 0;
    $scope.changeCategory = (categoryId) => {
      $scope.activeCategory = categoryId;
      if (categoryId === 0) {
        $scope.filterProduct = {};
      } else {
        $scope.filterProduct = { categoryId: categoryId };
      }
    };

    $scope.guides = $rootScope.guides;
    $scope.closeSearchModal = () => {
      $('#searchModal').modal('hide');
    };

    $scope.handleSearch = () => {
      if (!$scope.dirtyInput) {
        $scope.dirtyInput = true;
      }
      if ($scope.searchValue) {
        let partten = new RegExp($scope.searchValue.toUpperCase());
        $scope.searchProducts = $scope.products.filter((pro) => partten.test(pro.name.toUpperCase()));
      } else {
        $scope.searchProducts = [];
      }
    };

    $scope.addProduct = (product) => {
      productService.addProduct(product);
    };
  });
}

export default homeController;
