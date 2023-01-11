import app from '../index.js';
import guides from '../db/guides.js';

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
    console.log($scope.filterProduct);
  };

  $scope.guides = guides;
});
