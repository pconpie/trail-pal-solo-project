// Skip to content
// This repository
// Search
// Pull requests
// Issues
// Marketplace
// Explore
//  @pconpie
//  Sign out
// 8
// 0 16 PrimeAcademy/antares-grunt-es6 Private
//  Code  Issues 0  Pull requests 0  Projects 0  Wiki  Insights
// antares-grunt-es6/Gruntfile.js
// 4b410cb  on Jul 31, 2017
// @christopher-black christopher-black Updated to include content from lecture.
     
// 78 lines (75 sloc)  2.03 KB
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    babel: {
        options: {
          presets: ['babel-preset-env']
        },
        scripts: {
          files: [{
            expand: true,
            cwd: 'server/public/scripts/',
            src: '**/*.*',
            dest: 'temp',
            ext: '.js'
          }]
        }
      },
      uglify: {
        options: {
          sourceMap: true,
          sourceMapIncludeSources: true,
          sourceMapIn: 'temp/clientapp.js.map'
        },
        files: {
          expand: true,
          cwd: 'temp',
          src: 'clientapp.js',
          dest: 'server/public/scripts/',
          ext: '.min.js'
        }
      },
    /* Copy vendor, html and css files */
    copy: {
      /* htmlcss is whatever we want to call it */
      angular: {
        // Required but not getting into at this point
        expand: true,
        // Current working directory, where are the files?
        cwd: 'node_modules/angular/',
        // List of files to copy
        src: ['angular.min.js', 'angular.min.js.map'],
        // Destination, where should we put them?
        dest: 'server/public/vendors/'
      },
      angularRoute: {
        expand: true,
        cwd: 'node_modules/angular-route/',
        src: ['angular-route.min.js'],
        dest: 'server/public/vendors/'
      },
      angularAnimate: {
        expand: true,
        cwd: 'node_modules/angular-animate/',
        src: ['angular-animate.min.js'],
        dest: 'server/public/vendors/'
      },
      angularAria: {
        expand: true,
        cwd: 'node_modules/angular-aria/',
        src: ['angular-aria.min.js'],
        dest: 'server/public/vendors/'
      },
      angularMaterial: {
        expand: true,
        cwd: 'node_modules/angular-material/',
        src: ['angular-material.min.js', 'angular-material.min.css'],
        dest: 'server/public/vendors/'
      },
      angularMessages: {
        expand: true,
        cwd: 'node_modules/angular-messages/',
        src: ['angular-messages.min.js'],
        dest: 'server/public/vendors/'
      },
      leaflet: {
        expand: true,
        cwd: 'node_modules/leaflet/',
        src: ['leaflet.js', 'leaflet.css'],
        dest: 'server/public/vendors/'
      },
      fontawesome: {
        expand: true,
        cwd: 'node_modules/font-awesome/',
        src: ['font-awesome.min.css'],
        dest: 'server/public/vendors/'
      },
      angularRateIt: {
        expand: true,
        cwd: 'node_modules/angular-rateit/',
        src: ['ng-rateit.js', 'ng-rateit.css'],
        dest: 'server/public/vendors/'
      },
      leafletMarkerCluster: {
        expand: true,
        cwd: 'node_modules/leaflet.markercluster/',
        src: ['leaflet.markercluster.js', 'MarkerCluster.css', 'MarkerCluster.Default.css'],
        dest: 'server/public/vendors/'
      },
      leafletMarkerCluster: {
        expand: true,
        cwd: 'node_modules/leaflet-popup-angular/',
        src: ['L.Popup.Angular.js'],
        dest: 'server/public/vendors/'
      },
      html: {
        expand: true,
        // Current working directory
        cwd: 'server/public/views/',
        // List of files to copy
        src: ['*.html'], // [*.*] copies all file extensions
        // Destination for the files
        dest: 'server/public/views/'
      },
    css: {
      expand: true,
      // Current working directory
      cwd: 'server/public/styles/',
      // List of files to copy
      src: ['/*.css', '/assets/*.*'], // [*.*] copies all file extensions
      // Destination for the files
      dest: 'server/public/styles/'
    }
  }, // end copy
    watch: {
      // What files am I looking at?
      files: ['public/**/*.*'],
      // What task should I run?
      tasks: ['babel', 'concat', 'uglify', 'copy']
    },
    concat: {
      options: {
        sourceMap: true
      },
      clientapp: {
        src: ['temp/client.js', 'temp/controllers/*.js', 'temp/services/*.js'],
        dest: 'temp/clientapp.js'
      }
    }
  }); // end initConfig

  // LOAD PLUGIN: Bring the plugin into the project
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // REGISTER TASK: Acutally use the plugin
  grunt.registerTask('default', ['babel', 'concat', 'uglify', 'copy', 'watch']);
}
// © 2018 GitHub, Inc.
// Terms
// Privacy
// Security
// Status
// Help
// Contact GitHub
// API
// Training
// Shop
// Blog
// About