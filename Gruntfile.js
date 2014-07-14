// Gruntfile.js
module.exports = function(grunt) {

  grunt.initConfig({
    // check all js files for errors
    jshint: {
      all: ['public/js/**/*.js']
    },
    // minify all js files into app.min.js
    uglify: {
      build: {
        files: {
          'public/build/app.min.js': ['public/js/**/*.js', 'public/js/*.js']
        }
      }
    },
    // minify all css into app.min.css
    cssmin: {
      build: {
        files: {
          'public/build/app.min.css': ['public/css/*.css']
        }
      }
    },
    // watch css and js and run tasks
    watch: {
      css: {
        files: ['public/css/**/*.css'],
        tasks: ['cssmin']
      },
      js: {
        files: ['public/js/**/*.js'],
        tasks: ['jshint', 'uglify']
      }
    },
    // watch server for changes
    nodemon: {
      dev: {
        script: 'index.js'
      }
    },
    // run watch and nodemon at the same time
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', ['cssmin', 'jshint', 'uglify', 'concurrent']);

};
