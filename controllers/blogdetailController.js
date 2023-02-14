function blogdetailController(app) {
  app.controller('blogdetailController', function ($scope, $rootScope, $routeParams, productService) {
    $scope.blog = $rootScope.blogs.find((blog) => blog.id == $routeParams.id);
    $scope.tags = ['NFTs Trend', 'NFTs News', 'NFTs Hot', 'NFTs Sale'];
    $scope.addProduct = (product) => {
      productService.addProduct(product);
    };
  });
}

export default blogdetailController;
