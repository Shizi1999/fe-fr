function cartController(app) {
  app.controller('cartController', function ($scope, $rootScope) {
    $scope.products = $rootScope.products
      .filter((item) => item.id < 5)
      .map((item) => {
        item.number = Math.ceil(Math.random() * 4 + 1);
        return item;
      });
    $scope.totalPayment = () => {
      return $scope.products.reduce((prev, curr) => {
        return prev + curr.price * curr.number;
      }, 0);
    };
  });
}

export default cartController;
