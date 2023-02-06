function signinController(app) {
  app.controller('signinController', function ($scope, $rootScope, $location) {
    $scope.email = '';
    $scope.password = '';
    $scope.errorMessage = {
      email: '',
      password: '',
    };
    $scope.handleChange = () => {
      if ($scope.errorMessage.email || $scope.errorMessage.password) {
        $scope.errorMessage = {
          email: '',
          password: '',
        };
      }
    };
    $scope.login = (form) => {
      if (form.$valid) {
        let account = $rootScope.accounts.find((acc) => acc.email === $scope.email);
        if (!account) {
          $scope.errorMessage.email = 'Email is not register';
        } else {
          if (account.password !== $scope.password) {
            $scope.errorMessage.password = 'Password is invalid!';
          } else {
            $location.path('/');
            $rootScope.account.email = account.email;
          }
        }
      }
    };
  });
}

export default signinController;
