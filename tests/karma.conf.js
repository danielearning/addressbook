module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      '../app/bower_components/angular/angular.js',
      '../app/bower_components/angular-route/angular-route.js',
      '../app/bower_components/angular-mocks/angular-mocks.js',
      '../app/bower_components/angular-animate/angular-animate.js',
      '../dist/jsfiles/controllers/**/*.js',
      '../dist/jsfiles/services/**/*.js',
      '../dist/jsfiles/js/**/*.js',
      '../dist/jsfiles/app.js',
      'unit/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'tests/unit.xml',
      suite: 'unit'
    }

  });
};
