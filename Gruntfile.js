'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils')
  .livereloadSnippet;
var mountFolder = function(connect, dir) {
  return connect.static(require('path')
    .resolve(dir));
};

module.exports = function(grunt) {
  // load all grunt tasks
  require('matchdep')
    .filterDev('grunt-*')
    .forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      coffee: {
        files: ['<%= yeoman.app %>/scripts/**/*.coffee'],
        tasks: ['coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/*.coffee'],
        tasks: ['coffee:test']
      },
      livereload: {
        files: ['<%= yeoman.app %>/*.html', '{.tmp,<%= yeoman.app %>}/styles/*.css', '{.tmp,<%= yeoman.app %>}/scripts/*.js', '<%= yeoman.app %>/images/*.{png,jpg,jpeg}'],
        tasks: ['livereload']
      }
    },
    connect: {
      options: {
        hostname: '0.0.0.0',
        port: 9000
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
            lrSnippet,
            mountFolder(connect, '.tmp'),
            mountFolder(connect, 'app')];
          }
        }
      },
      test: {
        options: {
          middleware: function(connect) {
            return [
            mountFolder(connect, '.tmp'),
            mountFolder(connect, 'test')];
          }
        }
      },
      dist: {
        options: {
          middleware: function(connect) {
            return [
            mountFolder(connect, 'dist')];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: ['.tmp', '<%= yeoman.dist %>/*'],
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', '<%= yeoman.app %>/scripts/*.js', 'test/spec/*.js']
    },
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://localhost:<%= connect.options.port %>/index.html']
        }
      }
    },
    coffee: {
      dist: {
        expand: true,
        cwd: '<%= yeoman.app %>',
        src: ['**/*.coffee'],
        dest: '.tmp/',
        ext: '.js'
      },
      test: {
        files: [{
          expand: true,
          cwd: '.tmp/spec',
          src: '*.coffee',
          dest: 'test/spec'
        }]
      }
    },
    // not used since Uglify task does concat,
    // but still available if needed
    /*concat: {
            dist: {}
        },*/
    requirejs: {
      dist: {
        // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          // `name` and `out` is set by grunt-usemin
          baseUrl: '.tmp/edit/scripts',
          optimize: 'none',
          // TODO: Figure out how to make sourcemaps work with grunt-usemin
          // https://github.com/yeoman/grunt-usemin/issues/30
          //generateSourceMaps: true,
          // required to support SourceMaps
          // http://requirejs.org/docs/errors.html#sourcemapcomments
          preserveLicenseComments: false,
          useStrict: true,
          wrap: true,
          name: 'main',
          //uglify2: {} // https://github.com/mishoo/UglifyJS2
          mainFile: '.tmp/edit/sample.html'
        }
      }
    },
    useminPrepare: {
      html: ['.tmp/edit/sample.html', '.tmp/edit/index.html', '.tmp/index.html'],
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/*.html', '<%= yeoman.dist %>/edit/*.html'],
      css: ['<%= yeoman.dist %>/styles/*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    cssmin: {
      dist: {
        // files: {
        //     '<%= yeoman.dist %>/styles/main.css': [
        //         '.tmp/styles/*.css',
        //         '<%= yeoman.app %>/styles/*.css'
        //     ]
        // }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['*.html'],
          dest: '<%= yeoman.dist %>'
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/edit',
          src: ['*.html'],
          dest: '<%= yeoman.dist %>/edit'
        }]
      }
    },
    copy: {
      skelet: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/',
          src: ['**/*.html'],
          dest: '.tmp/'
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/',
          src: ['components/**'],
          dest: '.tmp/'
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/',
          src: ['scripts/**/*.js'],
          dest: '.tmp/'
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/',
          src: ['styles/**'],
          dest: '.tmp/'
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/',
          src: ['edit/scripts/**/*.js'],
          dest: '.tmp/'
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/',
          src: ['edit/styles/**'],
          dest: '.tmp/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: ['scripts/*', 'edit/scripts/**', 'fonts/**', 'img/**', '**/*.{ico,txt}', '.htaccess']
        }, {
          expand: true,
          dot: true,
          cwd: '.tmp',
          dest: '<%= yeoman.dist %>',
          src: ['scripts/**/*.js']
        }]
      }
    },
    bower: {
      rjsConfig: '.tmp/scripts/main.js',
      indent: '    '
    }
  });

  grunt.renameTask('regarde', 'watch');
  // remove when mincss task is renamed
  grunt.renameTask('mincss', 'cssmin');

  grunt.registerTask('server', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['open', 'connect:dist:keepalive']);
    }

    grunt.task.run(['clean:server', 'coffee:dist', 'livereload-start', 'connect:livereload', 'watch']);
  });

  grunt.registerTask('test', ['clean:server', 'coffee', 'connect:test', 'mocha']);

  grunt.registerTask('build', ['clean:dist',
  // 'jshint',
  // 'test',
  'coffee', 'copy:skelet', 'useminPrepare', 'requirejs', 'imagemin', 'cssmin', 'htmlmin', 'concat',
  // 'uglify',
  'copy', 'usemin']);

  grunt.registerTask('default', ['build']);
};
