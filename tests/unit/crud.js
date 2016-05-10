 
describe('AddressBookCrud', function(){
  beforeEach(module('addressBookApp'));

  it('Should add one entry', 
     inject(function($controller) {
    var sdemo = {}, slist = {}, scrud = {};
    var demosvc = $controller('AddressGlobalCtl', {$scope: sdemo});
    sdemo.resetDb();
    var clist = $controller('AddressListCtl', {$scope: slist});
    expect(slist.entries.length).toBe(4);
    var ccrud = $controller('AddressNewCtl', {$scope: scrud, $window: null});
    scrud.saveEntry({
      firstname: 'Alice',
      lastname: 'Smith',
      email: 'alice@smith.com',
      countrycode: 'UK'
    }, function() {
      expect(slist.entries.length).toBe(5);      
    });
  }));

  it('Should get one entry', 
     inject(function($controller) {
    var sdemo = {}, slist = {}, scrud = {};
    var demosvc = $controller('AddressGlobalCtl', {$scope: sdemo});
    sdemo.resetDb();
    var clist = $controller('AddressListCtl', {$scope: slist});
    expect(slist.entries.length).toBe(4);
    console.log(JSON.stringify(slist.entries[0])); 
    var ccrud = $controller('AddressDetailCtl', {$scope: scrud, $window: null, $routeParams: {entryId: "0"}});
    console.log(JSON.stringify(scrud.entry), scrud.countryname); 
    expect(scrud.entry).not.toBeNull();
    expect(scrud.entry).not.toBeUndefined();
    expect(scrud.entry.firstname).not.toBeNull();
    expect(scrud.entry.lastname).not.toBeNull();
    expect(scrud.entry.email).not.toBeNull();
    expect(scrud.entry.countrycode).not.toBeNull();
    expect(scrud.entry.firstname).not.toBeUndefined();
    expect(scrud.entry.lastname).not.toBeUndefined();
    expect(scrud.entry.email).not.toBeUndefined();
    expect(scrud.entry.countrycode).not.toBeUndefined();
    expect(scrud.countryname).not.toBeNull();
    expect(scrud.countryname).not.toBeUndefined();
  }));
 
  it('Should modify one entry', 
     inject(function($controller) {
    var sdemo = {}, slist = {}, scrud = {};
    var demosvc = $controller('AddressGlobalCtl', {$scope: sdemo});
    sdemo.resetDb();
    var clist = $controller('AddressListCtl', {$scope: slist});
    expect(slist.entries.length).toBe(4);
    //console.log(JSON.stringify(slist.entries[0])); 
    var ccrud = $controller('AddressEditCtl', {$scope: scrud, $window: null, $routeParams: {entryId: "0"}});
    //console.log(JSON.stringify(scrud.entry), scrud.countryname); 
    expect(scrud.entry).not.toBeNull();
    expect(scrud.entry).not.toBeUndefined();
    expect(scrud.entry.firstname).not.toBeNull();
    expect(scrud.entry.lastname).not.toBeNull();
    expect(scrud.entry.email).not.toBeNull();
    expect(scrud.entry.countrycode).not.toBeNull();
    expect(scrud.entry.firstname).not.toBeUndefined();
    expect(scrud.entry.lastname).not.toBeUndefined();
    expect(scrud.entry.email).not.toBeUndefined();
    expect(scrud.entry.countrycode).not.toBeUndefined();
    expect(scrud.countryname).not.toBeNull();
    expect(scrud.countryname).not.toBeUndefined();
    scrud.entry.countrycode = 'FR';
    scrud.saveEntry();

    scrud = {}, ccrud = {};
    ccrud = $controller('AddressEditCtl', {$scope: scrud, $window: null, $routeParams: {entryId: "0"}});
    expect(scrud.entry.countrycode).toEqual('FR');
    expect(scrud.countryname).toEqual('France');    
  }));

  it('Should delete one entry', 
     inject(function($controller) {
    var sdemo = {}, slist = {}, scrud = {};
    var demosvc = $controller('AddressGlobalCtl', {$scope: sdemo});
    sdemo.resetDb();
    var clist = $controller('AddressListCtl', {$scope: slist});
    expect(slist.entries.length).toBe(4);
    //console.log(JSON.stringify(slist.entries[0])); 
    var ccrud = $controller('AddressDeleteCtl', {$scope: scrud, $window: null, $routeParams: {entryId: "0"}});
    //console.log(JSON.stringify(scrud.entry), scrud.countryname); 
    scrud.deleteEntry();
    
    clist = {}; slist = {};
    clist = $controller('AddressListCtl', {$scope: slist});
    expect(slist.entries.length).toBe(3);   
  }));


});
