import products from './db/products.js';
import categories from './db/categories.js';
import blogs from './db/blogs.js';
import footerList from './controllers/common/footer.js';

const app = angular.module('app', ['ngRoute']);
app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: './views/home/home.html',
      controller: 'homeController',
    })
    .when('/product', {
      templateUrl: './views/product/product.html',
    })
    .when('/me', {
      templateUrl: './views/me/me.html',
    })
    .when('/cart', {
      templateUrl: './views/cart/cart.html',
    });
});

app.run([
  '$rootScope',
  '$location',
  '$routeParams',
  '$window',
  function ($rootScope, $location, $routeParams, $window) {
    $rootScope.products = products;
    $rootScope.categories = categories;
    $rootScope.blogs = blogs;
    $rootScope.footerList = footerList;
    $rootScope.activeRoute = '';
    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
      $rootScope.activeRoute = $location.path();
    });
  },
]);

export default app;
