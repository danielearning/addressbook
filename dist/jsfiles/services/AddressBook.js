'use strict';

/** AddressBook storage service.
 * 
 * Mimics $resource interface.
 * FIXME Should return promises instead of being synchronous.
 * @see https://docs.angularjs.org/api/ngResource/service/$resource
 * 
 * */

var service = angular.module('addressBookServices', ['addressBookUtils']);

service.factory('AddressBook', ['$window', // Since localStorage belongs to window.
'EmailValidator', // May use an external REST service.
'CountryValidator', // May check against a list of country codes. That list shouldn't be here.
'Cypher', // Store encrypted data. Cool!
function ($window, $emailvalidator, $countryvalidator, $cypher) {

  /** Makes sure there is something at window.localStorage, so that the app may work.
   * UI should warn about not having window.localStorage
   * */
  function enforcePhoneBook() {
    if (!$window.localStorage || !$window.localStorage.addressBookEntries) {
      if (!$window.localStorage) {
        $window.localStorage = {};
      }
      saveAddressBook({});
    }
  };

  /** Loads AddressBook from localStorage
   * FIXME This full save/load will scale poorly with multi-MB agendas.
   * */
  function loadAddressBook() {
    //console.log('load book');
    var decrypt = $cypher && $cypher.available() ? $cypher.decrypt : function (x) {
      return x;
    };
    return JSON.parse(decrypt($window.localStorage.addressBookEntries));
  };

  /** Saves AddressBook to localStorage
   * FIXME This full save/load will scale poorly with multi-MB agendas.
   * */
  function saveAddressBook(book) {
    var encrypt = $cypher && $cypher.available() ? $cypher.encrypt : function (x) {
      return x;
    };
    $window.localStorage.addressBookEntries = encrypt(JSON.stringify(book));
  };

  /** Runs entry validations.
   * 
   * */
  function validateEntry(entry) {
    if (!entry || !entry.firstname || !entry.lastname || !entry.countrycode || !entry.email) {
      //console.log('validateEntry', 'empty data');
      return { err: 'Required field is not present' };
    }
    if ($emailvalidator && !$emailvalidator.validate(entry.email)) {
      //console.log('validateEntry', 'bad email');
      return { err: 'Required email has bad format' };
    }
    if ($countryvalidator && !$countryvalidator.validate(entry.countrycode)) {
      //console.log('validateEntry', 'bad country');
      return { err: 'Required country cannot be recognized' };;
    }
    return true;
  };

  /** Generates an unique id for the data.
   * If we used a database back-end, it would make the ids for us.
   * 
   * */
  function makeId(entry, book) {
    var id = Date.now();
    if (book[id]) {
      var n = 1;
      while (book[id + n]) {
        n++;
      }
      id += n;
    }
    return id;
    /* Alternate id maker:
     * @returns email+john-doe-1@example.com
     * It's so wasteful, but it's cool that one can directly email to it.
    var baseslug = entry.email.replace('@', 
      '+' + 
      (entry.firstname.toLowerCase() + '-' + entry.lastname.toLowerCase())
      .replace(/[^\w]/, '-') + 
      '@');
    if (book[baseslug]) {
      baseslug = baseslug + '-';
      var n = 1;
      while (book[baseslug + n]) {
        n++;
      }
      return baseslug + n;
    }
    return baseslug;
    */
  };

  /** Delete
   * Declared apart, since it is used several times.
   * @param params.id Either id is the id, or id is an entry extended with its own id.
   * @returns Deleted instance
   * */
  function _remove(params, callback) {
    // The delete
    var _id = typeof params.id === 'string' ? params.id : params.id.id;
    enforcePhoneBook();
    var book = loadAddressBook();
    var toBeDeleted = book[_id];
    delete book[_id];
    saveAddressBook(book);
    if (callback) {
      callback(toBeDeleted);
    }
    return toBeDeleted;
  };

  return {
    get: function get(params, callback) {
      // Basic entry get.
      enforcePhoneBook();
      var e = loadAddressBook()[params.id];
      if (e) {
        e.id = params.id;
      }
      if (callback) {
        callback(e);
      }
      return e;
    },

    validate: function validate(entry) {
      // Validate only, like in Sequelize
      return validateEntry(entry);
    },

    save: function save(entry, callback) {
      // Validate and save entry
      enforcePhoneBook();

      if (validateEntry(entry) != true) {
        if (callback) {
          callback(false);
        }
        return false;
      }

      // Modify if id is present; create new if otherwise.
      var book = loadAddressBook();
      var id = typeof entry.id !== 'undefined' ? entry.id : makeId(entry, book);

      // Save only the strictly necessary
      var save = {
        firstname: '' + entry.firstname,
        lastname: '' + entry.lastname,
        email: '' + entry.email,
        countrycode: '' + entry.countrycode
      };

      // Save sanitized entry and return it
      book[id] = save;
      saveAddressBook(book);
      save.id = id;
      if (callback) {
        callback(save);
      }
      return save;
    },

    query: function query(callback) {
      // A get all
      enforcePhoneBook();
      var r = [];
      var book = loadAddressBook();
      for (var i in book) {
        var rr = book[i];
        rr.id = i;
        r.push(rr);
      }
      if (callback) {
        callback(r);
      }
      return r;
    },

    remove: _remove, // DELETE
    delete: _remove, // DELETE

    /** Empty.
     * Deletes entries
     * */
    clearDb: function clearDb() {
      saveAddressBook({});
    }
  };
}]);