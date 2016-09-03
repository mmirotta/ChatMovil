angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats, $timeout) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Aca ponemos la referencia a su firebase
  var mensajeReferencia = new Firebase('https://chatutn-1e655.firebaseio.com/usuarios/');

  $scope.misMensajes = [];

  // agregamos la funcion que funciona de callback que es disparada por cada mensaje de chat.
  mensajeReferencia.on('child_added', function (snapshot) {
      $timeout(function() {
        var message = snapshot.val();
        $scope.misMensajes.push(message);
      });
  }); 

  

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('NuevoMensajeCtrl', function($scope) {
  var mensajeReferencia = new Firebase('https://chatutn-1e655.firebaseio.com/usuarios/');
    $scope.txtUsuario = "Luis";
    $scope.txtMensaje = "Hola";
  $scope.Enviar = function(){

    console.log($scope.txtUsuario);
    console.log($scope.txtMensaje);
    var fecha = Firebase.ServerValue.TIMESTAMP;
    mensajeReferencia.push({usuario:$scope.txtUsuario, mensaje:$scope.txtMensaje, fechaIngreso:fecha});
    $scope.txtMensaje = "";
  };

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
