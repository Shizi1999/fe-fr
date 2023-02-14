function contactController(app) {
  app.controller('contactController', function ($scope) {
    $scope.sendMessage = () => {
      const myModal = new bootstrap.Modal(document.getElementById('contactModal'), {});
      myModal.show();
    };
  });
}

export default contactController;
