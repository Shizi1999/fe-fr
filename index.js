import db from './db/db.js';
import controller from './controllers/controller.js';
import service from './services/service.js';
const app = angular.module('app', ['ngRoute']);

// set up controller
for (const key in controller) {
  controller[key](app);
}
// setup service
for (const key in service) {
  service[key](app);
}
app.run([
  '$rootScope',
  '$location',
  function ($rootScope, $location) {
    for (const key in db) {
      $rootScope[key] = db[key];
    }
    $rootScope.activeRoute = '';
    $rootScope.avatar = 'assets/images/noavatar.jpg';
    $rootScope.account = {
      email: '',
    };

    $rootScope.timerId = null;

    $rootScope.cartProducts = [];

    $rootScope.totalProductsInCart = 0;

    $rootScope.deleteId = null;
    $rootScope.closeAddToastMessage = () => {
      clearTimeout($rootScope.timerId);
      $rootScope.timerId = null;
      $('#addToCart').hide();
    };

    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
      window.scrollTo(0, 0);
      let path = $location.path();
      $rootScope.activeRoute = path;
      if (path.startsWith('/product')) {
        $rootScope.activeRoute = '/product';
      }
      if (path === '/me') {
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
    .when('/blogdetail/:id', {
      templateUrl: 'views/blogdetail.html',
      controller: 'blogdetailController',
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
    })
    .otherwise({
      templateUrl: 'views/notfound.html',
    });
});

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

export default app;
