function productService(app) {
  app.factory('productService', function ($rootScope) {
    const addProduct = function (product, quantity = 1) {
      const pro = $rootScope.cartProducts.find((item) => item.id === product.id);
      if (pro) {
        pro.number += quantity;
      } else {
        product.number = quantity;
        product.selected = true;
        $rootScope.cartProducts.push(product);
      }
      getTotalProduct();
      $rootScope.showToastMessage('addToCart');
    };

    const handleIncrease = (product) => {
      product.number++;
      getTotalProduct();
    };

    const handleDecrease = (product) => {
      product.number--;
      getTotalProduct();
    };

    const handleRemoveProduct = () => {
      $rootScope.cartProducts = $rootScope.cartProducts.filter((pro) => pro.id !== $rootScope.deleteId);
      getTotalProduct();
    };

    const getTotalProduct = () => {
      $rootScope.totalProductsInCart = $rootScope.cartProducts.reduce((prev, curr) => {
        return prev + curr.number;
      }, 0);
    };

    const getTotalPayment = () => {
      return $rootScope.cartProducts.reduce((prev, curr) => {
        return curr.selected ? prev + curr.price * curr.number : prev;
      }, 0);
    };

    return {
      addProduct,
      handleDecrease,
      handleIncrease,
      handleRemoveProduct,
      getTotalPayment,
    };
  });
}

export default productService;
