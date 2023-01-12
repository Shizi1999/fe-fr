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
  function ($rootScope, $location) {
    $rootScope.products = db.products;
    $rootScope.categories = db.categories;
    $rootScope.blogs = db.blogs;
    $rootScope.footerLink = db.footerLink;
    $rootScope.activeRoute = '';
    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
      $rootScope.activeRoute = $location.path();
    });
  },
]);

export default app;
