import products from './db/products.js';
import categories from './db/categories.js';

var app = angular.module('app', ['ngRoute']);
app.config(function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: './views/home/home.html',
  });
});

app.run(function ($rootScope) {
  $rootScope.products = products;
  $rootScope.categories = categories;
});

export default app;
