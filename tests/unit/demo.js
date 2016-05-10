 
describe('AddressBookDemo', function(){
  beforeEach(module('addressBookApp'));

  it('Should create addressbook model with 4 entries', 
     inject(function($controller) {
    var scope = {};
    var demosvc = $controller('AddressGlobalCtl', {$scope: scope});
    scope.resetDb();
    
    var controller = $controller('AddressListCtl', {$scope: scope});
    expect(scope.entries.length).toBe(4);
  }));

  it('Should empty addressbook', 
     inject(function($controller) {
    var scope = {};
    var demosvc = $controller('AddressGlobalCtl', {$scope: scope});
    scope.emptyDb();
    
    var controller = $controller('AddressListCtl', {$scope: scope});
    expect(scope.entries.length).toBe(0);
  }));

});
