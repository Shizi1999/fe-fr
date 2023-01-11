import products from './db/products.js';
import categories from './db/categories.js';
import blogs from './db/blogs.js';
import footerList from './controllers/common/footer.js';

const app = angular.module('app', ['ngRoute']);
app.config(function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: './views/home/home.html',
  });
});

app.run(function ($rootScope) {
  $rootScope.products = products;
  $rootScope.categories = categories;
  $rootScope.blogs = blogs;
  $rootScope.footerList = footerList;
});

export default app;
