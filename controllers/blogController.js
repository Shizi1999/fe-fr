function blogController(app) {
  app.controller('blogController', function ($scope, $rootScope, productService) {
    $scope.tags = ['NFTs Trend', 'NFTs News', 'NFTs Hot', 'NFTs Sale'];
    $scope.blogs = $rootScope.blogs;
    $scope.addProduct = (product) => {
      productService.addProduct(product);
    };

    $scope.currentPage = 0;
    $scope.limit = 4;
    $scope.totalPage = Math.ceil($scope.blogs.length / $scope.limit);
    $scope.getPage = () => {
      let a = [];
      for (let i = 0; i < $scope.totalPage; i++) {
        a.push(i + 1);
      }
      return a;
    };
    $scope.changePage = (page) => {
      $scope.currentPage = page - 1;
      window.scroll(0, 0);
    };
    $scope.nextPage = () => {
      if ($scope.currentPage < $scope.totalPage - 1) {
        $scope.currentPage++;
        window.scroll(0, 0);
      }
    };
    $scope.prevPage = () => {
      if ($scope.currentPage > 0) {
        $scope.currentPage--;
        window.scroll(0, 0);
      }
    };
  });
}

export default blogController;
