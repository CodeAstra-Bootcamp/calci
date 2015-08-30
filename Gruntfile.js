module.exports = function(grunt) {
  grunt.initConfig({
    sass: {                              // Task 
      dist: {                            // Target 
        files: {                         // Dictionary of files 
          'assets/stylesheets/src/styles.css': 'assets/stylesheets/src/styles.scss'
        }
      }
    },
    watch: {
      css: {
        files: ['assets/stylesheets/src/*.scss'],
        tasks: ['sass', 'cssmin']
      },
      js: {
        files: ['assets/scripts/src/*.coffee'],
        tasks: ['coffee']
      }
    },
    cssmin: {
      target: {
        files: {
          'assets/stylesheets/app.min.css':
            [
              'assets/stylesheets/src/bootstrap.css',
              'assets/stylesheets/src/styles.css'
            ]
        }
      }
    },
    coffee: {
      compile: {
        files: {
          'assets/scripts/calci.js': 'assets/scripts/src/calci.coffee'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.registerTask('default', ['sass', 'cssmin', 'coffee', 'watch']);
};