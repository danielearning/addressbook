window.countries = require('country-list')();

window.onEditView = function onEditView($scope) {
  $(function() {
    if ($('.tt-input').length == 0) {
      var prevvalue = $('#country_acs').val();
      var countrySuggestions = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        identify: function(obj) { 
          return obj.code; 
        },
        local: countries.getData
      });
      
      function countrySuggestionsWithDefaults(q, sync) {
        if (q === '') {
          sync(countrySuggestions.get('ES', 'US', 'SE', 'MT'));
        } else {
          countrySuggestions.search(q, sync);
        }
      }

      $('#country_acs').typeahead({
          minLength: 0,
          highlight: true
        }, {
          name: 'countries',
          display: 'name',
          source: countrySuggestionsWithDefaults,
          templates: {
            suggestion: function (s) {
              return '<div><img src="img/flags_iso/16/' + s.code.toLowerCase() + '.png" /> ' + s.name + ' <small>(' + s.code + ')</small></div>';
            }
          }
        });
      $('#country_acs').bind('typeahead:select', function(ev, suggestion) {
        //console.log('Selection:', suggestion);
        $('#countrycode').val(suggestion.code);
        // Needed. Hidden fields do not bind to model automatically.
        $scope.entry.countrycode = suggestion.code;
      });
    }
  });
};
