import guides from '../db/guides.js';

function homeController(app) {
  app.controller('homeController', function ($scope) {
    $scope.activeCategory = 0;
    $scope.filterProduct = {};
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

    $scope.guides = guides;
  });
}

export default homeController;
