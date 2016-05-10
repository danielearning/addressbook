'use strict';

// Dependencies

var countries = require('country-list')();

// Utils.
var service = angular.module('addressBookUtils', []);

/** Email validation service
 * FIXME Email validation is a pain
 * @see http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
 * @see http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address
 * @see https://code.exacttarget.com/apis-sdks/rest-api/v1/address/validateEmail.html
 * 
 * */
service.factory('EmailValidator', [function () {
  return {
    /** Loosest validation.
     * Accept saving anything with an @, avoid false negatives.
     * */
    validate: function validate(email) {
      return typeof email === 'string' && email.indexOf('@') > 0 && email.indexOf('\n') < 0;
    }
  };
}]);

/** Country validation service
 * Checks the country code against a list.
 * @see 
 * */
service.factory('CountryValidator', [function () {

  return {
    /** Check is a valid, known country code.
     * @see https://www.npmjs.com/package/country-list
     * @see http://data.okfn.org/data/country-list
     * */
    validate: function validate(countrycode) {
      return countries.getName(countrycode) ? true : false;
    }
  };
}]);

/** Performs basic cyphering of data. This is more for demo purposes than anything
 * FIXME ROT13 is the first encoding method a kindergarten boy would think. And this is not even ROT
 * TODO Add at least GZIP compression to remove redundancy.
 * TODO Use a password, generate a long chain of random numbers and rotate against each.
 * */
service.factory('Cypher', [function () {
  return {
    /** If encryption/decryption is available.
     * Could check against having a password present. For such a simple method, it is always true.
     * */
    available: function available() {
      return true;
    },
    encrypt: function encrypt(text) {
      if (typeof text !== 'string') {
        return text;
      }
      return text.replace(/./g, function (x) {
        return String.fromCharCode(x.charCodeAt(0) + 13);
      });
    },
    decrypt: function decrypt(text) {
      if (typeof text !== 'string') {
        return text;
      }
      return text.replace(/./g, function (x) {
        return String.fromCharCode(x.charCodeAt(0) - 13);
      });
    }
  };
}]);

/** Converts country code to country name
 * 
 * */
service.filter('countryName', function () {
  return function (code) {
    return code && countries.getName(code);
  };
});

/** Returns an URL to a flag
 * FIXME Hotlinks to flags on the Internet. Get my own flags.
 * */
service.filter('countryFlag', function () {
  return function (code) {
    return code && 'img/flags_iso/24/' + code.toLowerCase() + '.png';
  };
});