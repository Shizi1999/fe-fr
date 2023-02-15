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
  '$http',
  function ($rootScope, $location, $http) {
    const databasePaths = ['accounts', 'blogs', 'categories', 'footerLink', 'guides', 'products'];
    const getData = (path) => {
      $http.get(`db/${path}.json`).then(
        (response) => {
          $rootScope[path] = response.data;
        },
        (err) => {
          console.log(err);
        },
      );
    };
    databasePaths.forEach((path) => {
      getData(path);
    });
    $rootScope.activeRoute = '';
    $rootScope.avatar = 'assets/images/noavatar.jpg';
    $rootScope.account = {
      email: '',
    };

    $rootScope.showToastMessage = (selectorID, delay = 1000) => {
      bootstrap.Toast.getOrCreateInstance(document.getElementById(selectorID), { delay }).show();
    };

    $rootScope.cartProducts = [];

    $rootScope.totalProductsInCart = 0;

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
    .when('/contact', {
      templateUrl: 'views/contact.html',
      controller: 'contactController',
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
