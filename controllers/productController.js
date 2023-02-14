function productController(app) {
  app.controller('productController', [
    '$scope',
    '$routeParams',
    '$rootScope',
    'productService',
    function ($scope, $routeParams, $rootScope, productService) {
      $scope.categoryName = $routeParams.categoryName;
      $scope.sorts = [
        { name: 'Order by Name', value: 'name' },
        { name: 'Order by Price', value: 'price' },
      ];
      $scope.sort = $scope.sorts[0];

      $scope.rangePrices = [
        { min: 5, max: 20 },
        { min: 20, max: 40 },
        { min: 40, max: 60 },
        { min: 60, max: 80 },
      ];
      $scope.filtersCate = [];
      $scope.filtersPrice = [];
      if ($scope.categoryName) {
        if ($scope.categoryName === 'All') {
          $scope.filtersCate = [];
        } else {
          let cate = $rootScope.categories.find((cate) => cate.name === $scope.categoryName);
          if (cate) {
            $scope.filtersCate = [cate];
          }
        }
      }

      $scope.handleSortChange = () => {
        if ($scope.sort.value === 'name') {
          $scope.products.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }

            return 0;
          });
        }
        if ($scope.sort.value === 'price') {
          $scope.products.sort((a, b) => a.price - b.price);
        }
        $scope.currentPage = 0;
      };

      $scope.filter = () => {
        let result = [];
        let min = 0;
        let max = 0;
        if ($scope.filtersPrice.length > 0) {
          let prices = $scope.filtersPrice.map((item) => [item.min, item.max]).flat();
          min = Math.min(...prices);
          max = Math.max(...prices);
        }

        if (max) {
          result = $rootScope.products.filter((pro) => pro.price >= min && pro.price < max);
        } else {
          result = $rootScope.products;
        }

        if ($scope.filtersCate.length === 0) {
          return result;
        } else {
          return result.filter((pro) => $scope.filtersCate.map((item) => item.id).includes(pro.categoryId));
        }
      };

      $scope.products = $scope.filter();

      $scope.currentPage = 0;
      $scope.limit = 6;
      $scope.totalPage = Math.ceil($scope.products.length / $scope.limit);
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

      $scope.addFiltersCate = (category) => {
        let item = $scope.filtersCate.find((cate) => cate.id === category.id);
        if (!item) {
          $scope.filtersCate = [...$scope.filtersCate, category];
          $scope.products = $scope.filter();
          $scope.totalPage = Math.ceil($scope.products.length / $scope.limit);
        }
      };

      $scope.removeFilterCate = (id) => {
        $scope.filtersCate = $scope.filtersCate.filter((item) => item.id !== id);
        $scope.products = $scope.filter();
        $scope.totalPage = Math.ceil($scope.products.length / $scope.limit);
      };

      $scope.checkActiveCate = (category) => {
        let cate = $scope.filtersCate.find((cate) => cate.id === category.id);
        return !!cate;
      };

      $scope.addFiltersPrice = (priceObj) => {
        let item = $scope.filtersPrice.find((price) => priceObj.min === price.min && priceObj.max === price.max);
        if (!item) {
          $scope.filtersPrice = [...$scope.filtersPrice, priceObj];
          $scope.products = $scope.filter();
          $scope.totalPage = Math.ceil($scope.products.length / $scope.limit);
        }
      };

      $scope.removeFilterPrice = (price) => {
        $scope.filtersPrice = $scope.filtersPrice.filter((item) => item.min !== price.min || item.max !== price.max);
        $scope.products = $scope.filter();
        $scope.totalPage = Math.ceil($scope.products.length / $scope.limit);
      };

      $scope.checkActivePrice = (priceObj) => {
        let item = $scope.filtersPrice.find((price) => priceObj.min === price.min && priceObj.max === price.max);
        return !!item;
      };
      $scope.addProduct = (product) => {
        productService.addProduct(product);
      };
    },
  ]);
}

export default productController;
