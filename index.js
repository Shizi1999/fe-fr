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
    .when('/product', {
      templateUrl: 'views/product.html',
      controller: 'productController',
    })
    .when('/productdetail/:id', {
      templateUrl: 'views/productdetail.html',
      controller: 'productDetailController',
    })
    .when('/me', {
      templateUrl: 'views/me.html',
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
    })
    .when('/signup', {
      templateUrl: 'views/signup.html',
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
      let path = $location.path();
      $rootScope.activeRoute = path;
      if (path === '/me') {
        console.log('Hello world');
      }
    });
  },
]);

export default app;
