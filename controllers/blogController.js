function blogController(app) {
  app.controller('blogController', function ($scope, $rootScope) {
    $scope.tags = ['NFTs Trend', 'NFTs News', 'NFTs Hot', 'NFTs Sale'];
  });
}

export default blogController;
