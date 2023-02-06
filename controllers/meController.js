function meController(app) {
  app.controller('meController', function ($scope, $rootScope, $location) {
    $scope.handleUploadImage = (e) => {
      if (e.target.files.length) {
        const src = URL.createObjectURL(e.target.files[0]);
        document.getElementById('previewAvatar').src = src;
        $rootScope.avatar = src;
      }
    };

    $scope.logout = () => {
      $rootScope.account.email = '';
      $location.path('/');
    };
  });
}

export default meController;
