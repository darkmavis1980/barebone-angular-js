module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // App configuration
  appConfig = {
    // Working directory path
    app: 'app',

    // Temp directory path (files compiled here during development)
    tmp: '.tmp',

    // Distribution directory path
    // Will be used by (to be implemented) build task
    // Full deployment ready app built to this directory
    dist: 'dist',

    // Styleguide directory path
    styleguide: 'styleguide',

    //if set to true Grunt will open a new page in the browser
    autoOpen: true,
    // Change this to '0.0.0.0' to access the server from outside.
    hostName: 'localhost'
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    appConfig: appConfig,

    //ngConstant will recreate a config.js file everytime grunt runs
    ngconstant: {
      options: {
        dest: '<%= appConfig.app %>/config.js',
        name: 'PXClient.configuration'
      },
      dev: {
        constants: {
          'API_DEFAULTS' : {
            'apiUrl' : 'http://localhost:8000',
            'environment' : 'development'
          }
        }
      },
      alessio: {
        constants: {
          'API_DEFAULTS' : {
            'apiUrl' : 'http://192.168.18.143:8000',
            'environment' : 'development'
          }
        }
      },
      alessiohome: {
        constants: {
          'API_DEFAULTS' : {
            'apiUrl' : 'http://192.168.1.17:8000',
            'environment' : 'development'
          }
        }
      },
      alan: {
        constants: {
          'API_DEFAULTS' : {
            'apiUrl' : 'http://192.168.18.126:8000',
            'environment' : 'development'
          }
        }
      },
      laura: {
        constants: {
          'API_DEFAULTS' : {
            'apiUrl' : 'http://192.168.17.254:8000',
            'environment' : 'development'
          }
        }
      },
      max: {
        constants: {
          'API_DEFAULTS' : {
            'apiUrl' : 'http://192.168.18.146:8000',
            'environment' : 'development'
          }
        }
      },
      pre: {
        constants: {
          'API_DEFAULTS' : {
            'apiUrl' : 'http://caresng-dev.cremelabs.com/api',
            'environment' : 'preproduction'
          }
        }
      },
      dist: {
        constants: {
          'API_DEFAULTS' : {
            'apiUrl' : 'http://caresng.cremelabs.com/api',
            'environment' : 'internal'
          }
        }
      },
      prod: {
        constants: {
          'API_DEFAULTS' : {
            'apiUrl' : 'http://caresng.cremeglobal.com/api',
            'environment' : 'production'
          }
        }
      }
    },

    'merge-json': {
      'i18n': {
        files: {
          '<%= appConfig.tmp %>/translations/en.json': [
            '<%= appConfig.app %>/common/**/translations/**/{,*/}*.json',
            '<%= appConfig.app %>/**/translations/**/{,*/}*.json',
            '<%= appConfig.app %>/**/**/translations/**/{,*/}*.json'
          ]
        }
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      options: {
        livereload: true
      },

      // Watch for changes in bower.json and run wiredep task
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },

      // Watch for changes in SASS / SCSS files and run sass task
      sass: {
        files: [
          '<%= appConfig.app %>/styles/{,*/}*.{scss,sass}',
          '<%= appConfig.app %>/**/styles/{,*/}*.{scss,sass}',
          '<%= appConfig.app %>/common/styles/{,*/}*.{scss,sass}'
        ],
        tasks: ['sass']
      },

      'merge-json': {
        files: [
          '<%= appConfig.app %>/common/**/translations/**/{,*/}*.json',
          '<%= appConfig.app %>/**/translations/**/{,*/}*.json',
          '<%= appConfig.app %>/**/**/translations/**/{,*/}*.json'
        ],
        tasks: ['merge-json']
      },

      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= appConfig.app %>/{,*/}*.html',
          '<%= appConfig.tmp %>/styles/{,*/}*.css',
          '<%= appConfig.tmp %>/translations/{,*/}*.{json}'
        ]
      }
    },

    // Check code styles
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        base: require('jshint-stylish')
      },
      app: {
        src: [
          '<%= appConfig.app %>/*.js',
          '<%= appConfig.app %>/**/*.js',
          '!<%= appConfig.app %>/bower_components/**/*.js',
          '!<%= appConfig.app %>/**/*.spec.js'
        ]
      },
      test: {
        src: [
          '*.spec.js',
          '<%= appConfig.app %>/**/tests/*.js'
        ]
      }
    },

    // Fix JS issues
    fixmyjs: {
      options: {
        dry: true
      },
      app: {
        files: [{
          expand: true,
          cwd: '.',
          src: [
            'Gruntfile.js',
            '<%= appConfig.app %>/**/*.js',
            '!<%= appConfig.app %>/bower_components/**/*.js',
            '!<%= appConfig.app %>/**/tests/*.js'
          ]
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: '.',
          src: [
            '*.spec.js',
            '<%= appConfig.app %>/**/tests/*.js'
          ]
        }]
      }
    },

    // Clean directories
    clean: {
      dev: {
        src: '<%= appConfig.tmp %>'
      },
      dist: {
        src: ['<%= appConfig.dist %>', '<%= appConfig.tmp %>']
      },
      styleguide: {
        src: '<%= appConfig.styleguide %>'
      }
    },

    // Automatically inject Bower components into the app index.html
    wiredep: {
      app: {
        src: [
          '<%= appConfig.app %>/index.html',
          '<%= appConfig.app %>/app.html',
          '<%= appConfig.app %>/styles/main.scss',
          '<%= appConfig.app %>/styles/login.scss'
        ],
        options: {
          exclude: ['app/bower_components/bootstrap/']
        }
      },

      test:{
        devDependencies: true,
        src: 'karma.conf.js',
        fileTypes: {
          js: {
            block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
            detect: {
              js: /'(.*\.js)'/gi
            },
            replace: {
              js: '\'{{filePath}}\','
            }
          }
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= appConfig.dist %>/scripts/{,*/}*.js',
          '<%= appConfig.dist %>/styles/{,*/}*.css',
          '<%= appConfig.dist %>/img/{,*/}*.{png,jpg,jpeg,gif,svg}',
          '<%= appConfig.dist %>/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      dist: {
        src: ['<%= appConfig.app %>/app.html', '<%= appConfig.app %>/index.html'],
        options: {
          dest: '<%= appConfig.dist %>',
          flow: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= appConfig.dist %>/**.html', '<%= appConfig.dist %>/*/**/*.html'],
      css: ['<%= appConfig.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= appConfig.dist %>','<%= appConfig.dist %>/img']
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= appConfig.app %>',
          src: ['img/{,*/}*.{png,jpg,jpeg,gif,svg}','bower_components/creme-global-styles/img/*.*'],
          dest: '<%= appConfig.dist %>/img',
          flatten: true
        }]
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= appConfig.tmp %>/styles/',
          src: '{,*/}*.css',
          dest: '<%= appConfig.tmp %>/styles/'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= appConfig.tmp %>/concat/scripts',
          src: ['*.js', '!oldieshim.js'],
          dest: '<%= appConfig.tmp %>/concat/scripts'
        }]
      }
    },

    // Prevents variable name mangling during usemin minification
    // -> Would like to eliminate the necessity of this (it slightly increases the size of minified files)
    // -> Currently necessary as vendor library ngDialog minification is buggy without this option
    uglify: {
      options: {
        mangle: false
      }
    },

    // Minifies html files
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= appConfig.dist %>',
          src: ['*.html', '*/**/*.html'],
          dest: '<%= appConfig.dist %>'
        }]
      }
    },

    // Minifies json files
    jsonmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= appConfig.dist %>',
          src: 'translations/{,*/}*.json',
          dest: '<%= appConfig.dist %>'
        }]
      }
    },

    // Automatically compile SASS / SCSS files
    sass: {
      dev: {
        files: [{
          expand: true,
          cwd: '<%= appConfig.app %>/styles',
          src: ['{,*/}*.{scss,sass}'],
          dest: '<%= appConfig.tmp %>/styles',
          ext: '.css'
        }]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: appConfig.hostName,
        livereload: 35729
      },

      livereload: {
        options: {
          // open page in default browser
          open: appConfig.autoOpen,
          middleware: function (connect) {
            return [
              connect.static(appConfig.tmp),
              connect.static(appConfig.app)
            ];
          }
        }
      },

      dist: {
        options: {
          open: true,
          base: '<%= appConfig.dist %>'
        }
      }
    },

    // Copies remaining files as needed
    copy: {
      dev: {
        files: [{
          expand: true,
          cwd: '<%= appConfig.app %>/bower_components/bootstrap-sass-official/assets/fonts',
          src: '{,*/}*',
          dest: '<%= appConfig.tmp %>/fonts'
        },{
          expand: true,
          cwd: '<%= appConfig.app %>/bower_components',
          src: 'creme-global-styles/img/*.*',
          dest: '<%= appConfig.tmp %>/img',
          flatten: true
        }]
      },
      config: {
        src: '<%= appConfig.app %>/config.sample.js',
        dest: '<%= appConfig.app %>/config.js'
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= appConfig.app %>',
          dest: '<%= appConfig.dist %>',
          src: [
            '*.html',
            '*/**/*.html',
            '!bower_components/**/*.html',
            'translations/{,*/}*.json',
            'common/ga.js',
            'fonts/*',
            'downloads/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/img',
          dest: '<%= appConfig.dist %>/img',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '.tmp/',
          dest: '<%= appConfig.dist %>',
          src: ['translations/*.json']
        }, {
          expand: true,
          cwd: '<%= appConfig.app %>',
          src: 'bower_components/**/{*.ttf,*.woff,*.woff2}',
          dest: '<%= appConfig.dist %>/fonts',
          flatten: true
        }]
      }
    },

    // Karma - testing framework
    karma: {
      options: {
        configFile: 'karma.conf.js',
      },
      // Keep tests running in the background
      concurrent: {
      },
      // Run tests once
      single: {
        singleRun: true
      },
      build: {
        browsers: ['PhantomJS'],
        singleRun: true
      }
    },

    protractor: {
      options: {
        configFile: "protractor.conf.js", // Default config file
        keepAlive: true,
        noColor: false,
      },
      all: {}
    },

    shell: {
      updateWebdriver: {
        command: 'npm run update-webdriver'
      },
      jsdoc: {
        command: 'jsdoc -c jsdoc.conf.json'
      },
      styleguide: {
        command: 'styleguide \
        --kss-source "<%= appConfig.app %>/styles/*.scss" \
        --kss-source "<%= appConfig.app %>/auth/styles/*.scss" \
        --kss-source "<%= appConfig.app %>/common/styles/*.scss" \
        --kss-source "<%= appConfig.app %>/common/errors/styles/*.scss" \
        --kss-source "<%= appConfig.app %>/common/notifications/styles/*.scss" \
        --kss-source "<%= appConfig.app %>/filesystem/styles/*.scss" \
        --kss-source "<%= appConfig.app %>/job/styles/*.scss" \
        --kss-source "<%= appConfig.app %>/wizard/styles/*.scss" \
        --kss-source "<%= appConfig.app %>/dataviewer/styles/*.scss" \
        --style-source "<%= appConfig.tmp %>/*.css" \
        --output <%= appConfig.styleguide %> \
        --watch --server'
      }
    },

    // Run tests and watch task concurrently
    concurrent: {
      tasks: [
        'karma:concurrent',
        'watch'
      ],
      options: {
        logConcurrentOutput: true
      }
    }
  });

  grunt.registerTask('e2etest', [
    'shell:updateWebdriver',
    'protractor'
  ]);

  grunt.registerTask('test', 'Run tests', function(){
    var type = grunt.option('type') || 'concurrent';
    var e2e = grunt.option('e2e');

    grunt.task.run([
      'npm-install',
      'copy:config'
    ]);

    if(e2e){
      grunt.task.run([
        'shell:updateWebdriver',
        'protractor'
      ]);
    }

    grunt.task.run([
      'wiredep:test',
      'karma:' + type
    ]);
  });

  grunt.registerTask('serve', 'Compile, serve, optionally run tests', function() {
    var env = grunt.option('env') || 'dist';
    var build = grunt.option('build');

    if(build){
      grunt.task.run([
        'copy:config',
        'wiredep:test',
        'karma:build',
        'build',
        'connect:dist:keepalive'
      ]);
    } else {
      var test = grunt.option('test');
      grunt.task.run([
        'clean:dev',
        'npm-install',
        'wiredep',
        'sass',
        'autoprefixer',
        'copy:config',
        'copy:dev',
        'ngconstant:' + env,
        'connect:livereload',
        'merge-json'
      ]);

      if (test) {
        return grunt.task.run(['concurrent']);
      } else {
        return grunt.task.run(['watch']);
      }
    }
  });

  grunt.registerTask('build', 'Build site for production / pre-production', function(){
    var env = grunt.option('env') || 'dist';
    var continuousIntegration = grunt.option('ci');

    if(!continuousIntegration){
      grunt.task.run([
      'npm-install',
      'copy:config'
      ]);
    } else {
      grunt.task.run([
        'copy:config',
        'wiredep:test',
        'karma:build'
      ]);
    }

    grunt.task.run([
      'clean:dist',
      'wiredep:app',
      'sass',
      'merge-json',
      'ngconstant:' + env,
      'useminPrepare',
      'imagemin',
      'autoprefixer',
      'concat',
      'ngAnnotate',
      'copy:dist',
      'cssmin',
      'uglify',
      'filerev',
      'usemin',
      'htmlmin',
      'jsonmin'
    ]);
  });

  grunt.registerTask('jsdoc', 'Build the documentation for PlatformX', function(){
    grunt.task.run('shell:jsdoc');
  });

  grunt.registerTask('styleguide', 'Build the styleguide for PlatformX', function(){
    grunt.task.run([
      'clean:dev',
      'clean:styleguide',
      'sass',
      'shell:styleguide'
    ]);
  });

  grunt.registerTask('default', 'serve');
};
