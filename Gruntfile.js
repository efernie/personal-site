module.exports = function (grunt) {
'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: [
        "Gruntfile.js", "js/src/modules/*.js", 'js/src/modules/**/*.js','js/src/modules/**/**/*.js','!js/src/test/*','!js/src/vendor/*'
      ],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: false,
        undef: true,
        boss : true,
        eqnull: true,
        browser: true,

        globals: {
          require: true,
          module: true,
          exports: true,
          document: true,
          console: true,
          $: true,
          io: true,
          __dirname: true
        }
      }
    },
    concat: {
      options: {
        separator: ";"
      }
    },
    uglify: {
      production: {
        options: {
          mangle: false
        },
        files: {
          'build/dist/application.min.js': ['js/build/application.js']
        }
      }
    },
    sass: {
      dev: {
        options: {
          style: 'nested',
          lineNumbers: false,
          debugInfo: false
        },
        files: {
          'client/styles/css/main.css': 'client/styles/sass/main.scss'
        }
      }
    },
    clean: {
      build: ['js/build/*','build/dist/*']
    },
    livereload: {
      port: 35729
    },
    watch : {
      compass : {
        files: ['client/styles/sass/main.scss','client/styles/sass/*.scss'],
        tasks: ['sass:dev','livereload']
      }
     }
  });

  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-regarde');

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('default', ['livereload-start','watch']);
  grunt.registerTask('lint',['jshint']);

};
