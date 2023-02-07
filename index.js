import db from './db/db.js';
import controller from './controllers/controller.js';

const app = angular.module('app', ['ngRoute']);

// set up controller
for (const key in controller) {
  controller[key](app);
}

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'homeController',
    })
    .when('/product/:categoryName', {
      templateUrl: 'views/product.html',
      controller: 'productController',
    })
    .when('/productdetail/:id', {
      templateUrl: 'views/productdetail.html',
      controller: 'productDetailController',
    })
    .when('/me', {
      templateUrl: 'views/me.html',
      controller: 'meController',
    })
    .when('/blog', {
      templateUrl: 'views/blog.html',
      controller: 'blogController',
    })
    .when('/cart', {
      templateUrl: 'views/cart.html',
      controller: 'cartController',
    })
    .when('/signin', {
      templateUrl: 'views/signin.html',
      controller: 'signinController',
    })
    .when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'signupController',
    });
});

app.run([
  '$rootScope',
  '$location',
  function ($rootScope, $location) {
    $rootScope.products = db.products;
    $rootScope.categories = db.categories;
    $rootScope.blogs = db.blogs;
    $rootScope.footerLink = db.footerLink;
    $rootScope.activeRoute = '';
    $rootScope.accounts = db.accounts;
    $rootScope.totalProduct = 0;
    $rootScope.avatar = 'assets/images/noavatar.jpg';
    $rootScope.account = {
      email: '',
    };
    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
      window.scrollTo(0, 0);
      let path = $location.path();
      $rootScope.activeRoute = path;
      if (path.startsWith('/product')) {
        $rootScope.activeRoute = '/product';
      }
      if (path === '/me') {
        console.log($rootScope.account.email);
        if (!$rootScope.account.email) {
          $location.path('/signin');
        }
      }
      if ($('#searchModal')) {
        $('#searchModal').modal('hide');
      }
    });
  },
]);

app.directive('customOnChange', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.customOnChange);
      element.on('change', onChangeHandler);
      element.on('$destroy', function () {
        element.off();
      });
    },
  };
});

app.factory('productService', function () {
  let productList = [];

  const addProduct = function (product) {
    const pro = productList.find((item) => item.id === product.id);
    if (pro) {
      pro.number++;
    } else {
      product.number = 1;
      productList.push(product);
    }
  };

  const setProducts = (products) => {
    productList = products;
  };

  const getProducts = function () {
    return productList;
  };

  const addToCartWithQuantity = (product, quantity) => {
    const pro = productList.find((item) => item.id === product.id);
    if (pro) {
      pro.number += quantity;
    } else {
      product.number = quantity;
      productList.push(product);
    }
  };

  const getTotalProduct = () => {
    return productList.reduce((prev, curr) => {
      return prev + curr.number;
    }, 0);
  };

  return {
    addProduct,
    addToCartWithQuantity,
    getProducts,
    getTotalProduct,
    setProducts,
  };
});

export default app;
