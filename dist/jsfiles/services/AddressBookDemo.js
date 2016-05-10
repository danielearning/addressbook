'use strict';

/** Create demo entries.
 * Only the first time or on demand.
 * @cond window.localStorage.democreated If false or not present, create demo entry
 * */

var _module = angular.module('addressBookDemo', ['addressBookServices']);

/** Creates demo entries only if no democreated
 * 
 * */
function createDemoEntries($window, AddressBook) {
  if (!$window.localStorage.democreated) {
    if (AddressBook.save({
      id: 0,
      email: 'danielmc@coit.es',
      firstname: 'Daniel',
      lastname: 'Martínez Contador',
      countrycode: 'ES'
    }) && AddressBook.save({
      id: 1,
      email: 'yeahyeahyeah@gmail.com',
      firstname: 'Fuensanta',
      lastname: 'von Spanie',
      countrycode: 'NL'
    }) && AddressBook.save({
      id: 2,
      email: 'luis.alfonso@gmail.com',
      firstname: 'Luis Alfonso',
      lastname: 'de la Vega Balrog Bison de Todos los Santos',
      countrycode: 'AR'
    }) && AddressBook.save({
      id: 3,
      email: 'j.doe@example.com',
      firstname: 'John',
      lastname: 'Doe',
      countrycode: 'US'
    })) {
      $window.localStorage.democreated = true;
    }
  }
  return;
};

_module.controller('AddressGlobalCtl', ['$scope', '$window', // Since localStorage belongs to window.
'AddressBook', function ($scope, $window, AddressBook) {
  $scope.emptyDb = function () {
    AddressBook.clearDb();
  };
  $scope.resetDb = function () {
    $scope.emptyDb();
    delete $window.localStorage.democreated;
    createDemoEntries($window, AddressBook);
  };
}]);

_module.run(['$window', // Since localStorage belongs to window.
'AddressBook', // Access to AddressBook
createDemoEntries]);