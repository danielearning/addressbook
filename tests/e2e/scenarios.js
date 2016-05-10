'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */
(function (_it) {
 function it(t, f) {
   _it(t, function() {
     console.log(t);
     f.apply(this, arguments);
   });
 };

 describe('my app', function() {

  it('should automatically redirect to / when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch('/entries');
  });

  describe('about', function() {
    it('should render about when user navigates to /about', function() {
      browser.get('index.html#/about');
      expect(element.all(by.css('h1')).first().getText()).toMatch(/About/i);
    });
    
    it('should contain a button to reset database', function() {
      browser.get('index.html#/about');
      // Click Reset
      //console.log(element.all(by.css('button')).getText());
      expect(element.all(by.css('button')).getText()).toMatch(/Reset/i);
      //console.log(element.all(by.css('button[ng-click="resetDb()"]')).getText());
      element.all(by.css('button[ng-click="resetDb()"]')).click();
      
      // Check there are four entries
      browser.get('index.html#/entries');
      expect(element.all(by.css('.entryrow')).count()).toBe(4);
    });
    
    it('should contain a button to clear database', function() {
      browser.get('index.html#/about');
      // Click Clear
      expect(element.all(by.css('button')).getText()).toMatch(/Clear/i);
      element.all(by.css('button[ng-click="emptyDb()"]')).click();
      
      // Check there are four entries
      browser.get('index.html#/entries');
      expect(element.all(by.css('.entryrow')).count()).toBe(0);
    });      
  });

  describe('entries', function() {
    it('should render entries when user navigates to /entries', function() {
      browser.get('index.html#/about');
      // Click Reset
      expect(element.all(by.css('button')).getText()).toMatch(/Reset/i);
      element.all(by.css('button[ng-click="resetDb()"]')).click();
      
      // Check it goes to the right page
      browser.get('index.html#/entries');
      expect(element.all(by.css('h1')).first().getText()).toMatch(/Address book/i);
      expect(element.all(by.css('ul.listview')).count()).toBe(1);
        
      // Can change views
      element.all(by.css('button.tableview')).first().click();
      expect(element.all(by.css('ul.tableview')).count()).toBe(1);
      element.all(by.css('button.listview')).first().click();
      expect(element.all(by.css('ul.listview')).count()).toBe(1);

      // Check there are four entries
      expect(element.all(by.css('.entryrow')).count()).toBe(4);

      // Check by entrylist
      var entrylist = element.all(by.repeater('entry in entries'));
      var query = element(by.model('query'));
      query.sendKeys('com');
      expect(entrylist.count()).toBe(3);
      query.clear();
      query.sendKeys('daniel');
      expect(entrylist.count()).toBe(1);
      query.clear();
      
      var orderBy = element(by.model('orderBy'));
      orderBy.element(by.css('option[value="firstname"]')).click();
      expect(element.all(by.css('.entryrow .firstname')).first().getText()).toMatch(/^Daniel/);
      expect(element.all(by.css('.entryrow .firstname')).last().getText()).toMatch(/^Luis/);

      orderBy.element(by.css('option[value="lastname"]')).click();
      expect(element.all(by.css('.entryrow .lastname')).first().getText()).toMatch(/^de/);
      expect(element.all(by.css('.entryrow .lastname')).last().getText()).toMatch(/^von/);

      orderBy.element(by.css('option[value="email"]')).click();
      expect(element.all(by.css('.entryrow .entryemail')).first().getText()).toMatch(/^daniel/);
      expect(element.all(by.css('.entryrow .entryemail')).last().getText()).toMatch(/^yeah/);

      orderBy.element(by.css('option[value="countrycode"]')).click();
      expect(element.all(by.css('.entryrow .entrycountry')).first().getText()).toMatch(/^Argentina/);
      expect(element.all(by.css('.entryrow .entrycountry')).last().getText()).toMatch(/^United/);
    });    
  });


  describe('listedit', function() {
    it('should render /entries for edition', function() {
      browser.get('index.html#/about');
      // Click Reset
      expect(element.all(by.css('button')).getText()).toMatch(/Reset/i);
      element.all(by.css('button[ng-click="resetDb()"]')).click();
      
      // Check it goes to the right page
      browser.get('index.html#/entries/edit');
      expect(element.all(by.css('h1')).first().getText()).toMatch(/Address book/i);
      expect(element.all(by.css('ul.tableview')).count()).toBe(1);      
      expect(element.all(by.css('.entryrow')).count()).toBe(4);
      expect(element.all(by.css('.entryrow .entrycontrols .entryedit')).count()).toBe(4);
      expect(element.all(by.css('.entryrow .entrycontrols .entrydelete')).count()).toBe(4);
      expect(element.all(by.css('.btn.entryadd')).count()).toBe(1);

      // Check button go to the right page
      element.all(by.css('.entryrow .entrycontrols .entryedit')).first().click();
      expect(element.all(by.css('#views .edit h1')).first().getText()).toMatch(/^Contact/i);
      // Go back
      browser.get('index.html#/entries/edit');
      // Delete button
      element.all(by.css('.entryrow .entrycontrols .entrydelete')).first().click();
      expect(element.all(by.css('#views .delete h1')).first().getText()).toMatch(/^Contact/i);
      // Go back
      browser.get('index.html#/entries/edit');
      // Add button
      element.all(by.css('.btn.entryadd')).click();
      expect(element.all(by.css('#views .new h1')).first().getText()).toMatch(/^Contact/i);
    });    
  });

  describe('addnew', function() {
    it('should render form for addition', function() {
      // Check it goes to the right page
      browser.get('index.html#/entries/new');      
      expect(element.all(by.css('#views .new h1')).first().getText()).toMatch(/^Contact/i);
      expect(element.all(by.css('.btn[ng-click="saveEntry()"]')).count()).toBeGreaterThan(0);
      expect(element.all(by.css('.btn[href="#/"]')).count()).toBeGreaterThan(0);
      
      var mfn = element(by.model('entry.firstname'));
      var mln = element(by.model('entry.lastname'));
      var mem = element(by.model('entry.email'));
      var mcc = element(by.model('entry.countrycode'));
      var mcs = element(by.css('#country_acs'));
      var bsv = element(by.css('.btn[ng-click="saveEntry()"]'));
      
      // Must remain at the same page and show alert.
      bsv.click();
      expect(element.all(by.css('#views .new h1')).first().getText()).toMatch(/^Contact/i);
      expect(element.all(by.css('.alert')).count()).toBe(1);
      
      // If country missing, the same.
      mfn.sendKeys('Alice');
      mln.sendKeys('Smith');
      mem.sendKeys('alice@example.com');
      bsv.click();
      expect(element.all(by.css('#views .new h1')).first().getText()).toMatch(/^Contact/i);
      expect(element.all(by.css('.alert')).count()).toBe(1);

      // Validate country entry
      mcs.sendKeys('Germ');
      expect(element.all(by.css('.tt-selectable')).count()).toBeGreaterThan(0);
      element.all(by.css('.tt-selectable')).first().click();
      expect(element.all(by.css('#countrycode')).first().getAttribute('value')).toEqual('DE');
      
      // Dont allow if fn missing
      mfn.clear();
      bsv.click();
      expect(element.all(by.css('#views .new h1')).first().getText()).toMatch(/^Contact/i);
      expect(element.all(by.css('.alert')).count()).toBe(1);

      // Dont allow if ln missing
      mfn.sendKeys('Alice');
      mln.clear();
      bsv.click();
      expect(element.all(by.css('#views .new h1')).first().getText()).toMatch(/^Contact/i);
      expect(element.all(by.css('.alert')).count()).toBe(1);

      // Dont allow if email missing
      mln.sendKeys('Smith');
      mem.clear();
      bsv.click();
      expect(element.all(by.css('#views .new h1')).first().getText()).toMatch(/^Contact/i);
      expect(element.all(by.css('.alert')).count()).toBe(1);

      // Dont allow if email bad
      mem.sendKeys('Smith');
      bsv.click();
      expect(element.all(by.css('#views .new h1')).first().getText()).toMatch(/^Contact/i);
      expect(element.all(by.css('.alert')).count()).toBe(1);

      // Allow otherwise. Oh, no! She capitalized the email!
      mem.sendKeys('Alice@example.com');
      bsv.click();
      expect(element.all(by.css('#views .detail h1')).first().getText()).toMatch(/^Contact/i);
      expect(element.all(by.css('.alert')).count()).toBe(1);
      browser.get('index.html#/entries');
      expect(element.all(by.css('h1')).first().getText()).toMatch(/Address book/i);
      // Check there are FIVE entries
      expect(element.all(by.css('.entryrow')).count()).toBe(5);
    });
  });

  describe('modification', function() {
    it('should render view for modification', function() {
      // Check it goes to the right page
      browser.get('index.html#/entries/1/edit');      
      expect(element.all(by.css('#views .edit h1')).first().getText()).toMatch(/Fuen/i);
      expect(element.all(by.css('.btn[ng-click="saveEntry()"]')).count()).toBeGreaterThan(0);
      expect(element.all(by.css('.btn[href="#/entries/1"]')).count()).toBeGreaterThan(0);

      var mfn = element(by.model('entry.firstname'));
      var mln = element(by.model('entry.lastname'));
      var mem = element(by.model('entry.email'));
      var mcc = element(by.model('entry.countrycode'));
      var mcs = element(by.css('#country_acs'));
      var bsv = element(by.css('.onlyedit .btn[ng-click="saveEntry()"]'));
      
      mem.clear();
      mem.sendKeys('random123@qwerasdf.com');
      bsv.click();

      browser.get('index.html#/entries');
      expect(element.all(by.css('.entryemail')).getText()).toMatch(/random123@qwerasdf.com/i);
    });
  });
  
  describe('detail', function() {
    it('should render view for details', function() {
      // Check it goes to the right page
      browser.get('index.html#/entries/0');      
      expect(element.all(by.css('#views .detail h1')).first().getText()).toMatch(/Daniel/i);
            
      expect(element.all(by.css('.btn.entryedit')).count()).toBeGreaterThan(0);
      expect(element.all(by.css('.btn.entrydelete')).count()).toBeGreaterThan(0);
      
      expect(element.all(by.css('.entryfirstname')).first().getText()).toMatch(/Daniel/);
      expect(element.all(by.css('.entrylastname')).first().getText()).toMatch(/Contador/);
      expect(element.all(by.css('.entryemail')).first().getText()).toMatch(/danielmc@coit.es/);
      expect(element.all(by.css('.entrycountryname')).first().getText()).toMatch(/Spain/);
      
      // Check button go to the right page
      element.all(by.css('.onlydetail .btn.entryedit')).first().click();
      expect(element.all(by.css('#views .edit h1')).first().getText()).toMatch(/Daniel/i);
      // Go back
      browser.get('index.html#/entries/0');
      // Check button go to the right page
      element.all(by.css('.onlydetail .btn.entrydelete')).first().click();
      expect(element.all(by.css('#views .delete h1')).first().getText()).toMatch(/Daniel/i);
    });
  });
  
  describe('delete', function() {
    it('should render view for deletion', function() {
      // Check it goes to the right page
      browser.get('index.html#/entries/0/delete');      
      expect(element.all(by.css('#views .delete h1')).first().getText()).toMatch(/Daniel/i);
      expect(element.all(by.css('.btn.entrydelete')).count()).toBeGreaterThan(0);
      expect(element.all(by.css('.btn[ng-click="deleteEntry()"]')).count()).toBeGreaterThan(0);
      expect(element.all(by.css('.btn[href="#/entries/0"]')).count()).toBeGreaterThan(0);

      expect(element.all(by.css('.entryfirstname')).first().getText()).toMatch(/Daniel/);
      expect(element.all(by.css('.entrylastname')).first().getText()).toMatch(/Contador/);
      expect(element.all(by.css('.entryemail')).first().getText()).toMatch(/danielmc@coit.es/);
      expect(element.all(by.css('.entrycountryname')).first().getText()).toMatch(/Spain/);

      element.all(by.css('.btn[ng-click="deleteEntry()"]')).click();
      // I should be redirected to listing, being that entry deleted
      browser.get('index.html#/entries/0');
      expect(element.all(by.css('#views h1')).first().getText()).toMatch(/404/i);
      
      // Reset DB in case anyone looks for the deleted item
      browser.get('index.html#/about');
      element.all(by.css('button[ng-click="resetDb()"]')).click();
    });
  });
  
 });
})(it);
