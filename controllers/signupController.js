function signupController(app) {
  app.controller('signupController', function ($scope, $rootScope) {
    $scope.email = '';
    $scope.password = '';
    $scope.confirmPassword = '';
    $scope.timerToastId = null;
    $scope.errorMessage = {
      email: '',
      password: '',
      confirmPassword: '',
    };
    $scope.handleChange = () => {
      if ($scope.errorMessage.email || $scope.errorMessage.password || $scope.errorMessage.confirmPassword) {
        $scope.errorMessage = {
          email: '',
          password: '',
          confirmPassword: '',
        };
      }
    };

    $scope.signup = (form) => {
      if (form.$valid) {
        let account = $rootScope.accounts.find((acc) => acc.email === $scope.email);
        if (account) {
          $scope.errorMessage.email = 'Email is already in use!';
        } else if ($scope.password !== $scope.confirmPassword) {
          $scope.errorMessage.confirmPassword = 'Confirm Password is invalid!';
        } else {
          $rootScope.accounts = [
            ...$rootScope.accounts,
            {
              email: $scope.email,
              password: $scope.password,
            },
          ];
          $scope.email = '';
          $scope.password = '';
          $scope.confirmPassword = '';
          $('#signupToast').show();
          if ($scope.timerToastId) {
            clearTimeout($scope.timerToastId);
            $scope.timerToastId = null;
          }
          $scope.timerToastId = setTimeout(() => {
            $('#signupToast').hide();
          }, 3000);
        }
      }
    };
  });
}

export default signupController;
