function cartController(app) {
  app.controller('cartController', function ($scope, $rootScope, productService) {
    $scope.formState = {
      name: '',
      address: '',
      phone: '',
    };
    $scope.orderMessage = '';
    $scope.deleteProduct = null;
    $scope.phoneError = '';
    $scope.products = productService.getProducts().map((item) => {
      item.checked = true;
      return item;
    });
    $scope.getCheckedAll = () => {
      for (let i = 0; i < $scope.products.length; i++) {
        if (!$scope.products[i].checked) {
          return false;
        }
      }
      return true;
    };

    $scope.isCheckedAll = $scope.getCheckedAll();
    $scope.handleShowDeleteModal = () => {
      let myModalEl = document.getElementById('deleteProductModal');
      let modal = bootstrap.Modal.getOrCreateInstance(myModalEl);
      modal.show();
    };
    $scope.handleCheckProduct = (pro) => {
      pro.checked = !pro.checked;
      $scope.isCheckedAll = $scope.getCheckedAll();
    };

    $scope.handleCheckAll = () => {
      if ($scope.isCheckedAll) {
        $scope.products = $scope.products.map((pro) => {
          pro.checked = false;
          return pro;
        });
      } else {
        $scope.products = $scope.products.map((pro) => {
          pro.checked = true;
          return pro;
        });
      }
      $scope.isCheckedAll = !$scope.isCheckedAll;
    };
    $scope.handleDecrease = (product) => {
      if (product.number === 1) {
        $scope.deleteProduct = product;
        $scope.handleShowDeleteModal();
      } else {
        product.number--;
        $rootScope.totalProduct = productService.getTotalProduct();
      }
    };

    $scope.handleIncrease = (product) => {
      product.number++;
      $rootScope.totalProduct = productService.getTotalProduct();
    };

    $scope.handleRemoveProduct = () => {
      $scope.products = $scope.products.filter((pro) => pro.id !== $scope.deleteProduct.id);
      let myModalEl = document.getElementById('deleteProductModal');
      let modal = bootstrap.Modal.getOrCreateInstance(myModalEl);
      modal.hide();
      productService.setProducts([...$scope.products]);
      $rootScope.totalProduct = productService.getTotalProduct();
    };
    $scope.handleBtnDelete = (product) => {
      $scope.deleteProduct = product;
      $scope.handleShowDeleteModal();
    };
    $scope.totalPayment = () => {
      return $scope.products.reduce((prev, curr) => {
        return curr.checked ? prev + curr.price * curr.number : prev;
      }, 0);
    };

    $scope.order = (form) => {
      if (form.$valid) {
        let selectedProduct = $scope.products.filter((item) => item.checked).length > 0;
        if (selectedProduct) {
          $scope.products = $scope.products.filter((item) => !item.checked);
          let myToastEl = document.getElementById('cartSuccessMessage');
          let myToast = bootstrap.Toast.getOrCreateInstance(myToastEl);
          myToast.show();
          setTimeout(() => {
            myToast.hide();
          }, 2000);
          $rootScope.totalProduct = productService.getTotalProduct();
        } else {
          let myToastEl = document.getElementById('cartErrorMessage');
          let myToast = bootstrap.Toast.getOrCreateInstance(myToastEl);
          myToast.show();
          setTimeout(() => {
            myToast.hide();
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
