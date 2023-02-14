function cartController(app) {
  app.controller('cartController', function ($scope, $rootScope, productService) {
    $scope.formState = {
      name: '',
      address: '',
      phone: '',
    };
    $scope.phoneError = '';

    const getCheckedAll = () => {
      for (let i = 0; i < $rootScope.cartProducts.length; i++) {
        if (!$rootScope.cartProducts[i].selected) {
          return false;
        }
      }
      return true;
    };

    $scope.isCheckedAll = getCheckedAll();

    const handleShowDeleteModal = () => {
      let myModalEl = document.getElementById('deleteProductModal');
      let modal = bootstrap.Modal.getOrCreateInstance(myModalEl);
      modal.show();
    };

    const handleCloseDeleteModal = () => {
      let myModalEl = document.getElementById('deleteProductModal');
      let modal = bootstrap.Modal.getOrCreateInstance(myModalEl);
      modal.hide();
    };

    $scope.handleCheckProduct = (pro) => {
      pro.selected = !pro.selected;
      $scope.isCheckedAll = getCheckedAll();
    };

    $scope.handleCheckAll = () => {
      if ($scope.isCheckedAll) {
        $rootScope.cartProducts.map((pro) => {
          pro.selected = false;
          return pro;
        });
      } else {
        $rootScope.cartProducts.map((pro) => {
          pro.selected = true;
          return pro;
        });
      }

      $scope.isCheckedAll = !$scope.isCheckedAll;
    };

    $scope.handleDecrease = (product) => {
      if (product.number === 1) {
        $rootScope.deleteId = product.id;
        handleShowDeleteModal();
      } else {
        productService.handleDecrease(product);
      }
    };

    $scope.handleIncrease = (product) => {
      productService.handleIncrease(product);
    };

    $scope.handleRemoveProduct = () => {
      productService.handleRemoveProduct();
      handleCloseDeleteModal();
    };

    $scope.handleBtnDelete = (product) => {
      $rootScope.deleteId = product.id;
      handleShowDeleteModal();
    };

    $scope.totalPayment = () => {
      return productService.getTotalPayment();
    };

    $scope.order = (form) => {
      if (form.$valid) {
        let selectedProduct = $rootScope.cartProducts.filter((item) => item.selected).length > 0;
        if (selectedProduct) {
          $rootScope.cartProducts = $rootScope.cartProducts.filter((item) => !item.selected);
          $('#cartSuccessMessage').show();
          setTimeout(() => {
            $('#cartSuccessMessage').hide();
          }, 2000);
          $rootScope.totalProductsInCart = 0;
        } else {
          $('#cartErrorMessage').show();
          setTimeout(() => {
            $('#cartErrorMessage').hide();
          }, 2000);
        }
      }
    };

    $scope.handlePhoneKeyUp = (form) => {
      if (form.phone.$error.pattern) {
        $scope.phoneError = 'Số điện thoại không đúng định dạng';
      } else {
        $scope.phoneError = '';
      }
    };
  });
}

export default cartController;
