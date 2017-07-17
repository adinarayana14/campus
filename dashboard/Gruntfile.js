module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        // Telling Grunt where to look for the node modules needed for the project
        pkg: grunt.file.readJSON('package.json'),

        // Telling Sass which files to compile and in which style
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: { // destination:source
                    'app/stylesheets/src/style.compiled.css': 'app/stylesheets/src/style.scss'//, Uncomment this and next line to compile bootstrap itself, (This should never be needed)
                }
            }
        },

        // Setting up Autoprefixer to prefix up to 3 browser versions back everywhere, this also covers IE 8 & 9
        autoprefixer: {
            options: {
                browsers: ['last 4 version']
            },
            single_file: {
                src: 'app/stylesheets/src/style.compiled.css',      // The file we autoprefix. This is generated from the sass task above
                dest: 'app/stylesheets/src/style.autoprefixed.css'  // The file we generate
            }
        },

        // Here we're telling CSSmin to look for a file that has the name of *.prefixed.css and minify it while giving it an extension of .min.css
        cssmin: {
            prod_build: {
                expand: true,
                cwd: 'app/stylesheets/src/',    // The core working directory where the prefixing happens
                src: ['*.autoprefixed.css'],           // Looks specifically for any file with aa .autoprefixed.css name. Autoprefixer generates this before we minify, (see above task).
                dest: 'app/stylesheets/dist/',  // The location in which the minified CSS file will be generated to
                ext: '.min.css'                        // This adds .min.css to the end of the file name to indicate that it's the minified version
            }
        },

        // Linting our custom JS
        jshint: {
            beforeconcat: ['app/javascripts/src/custom/custom.js']
        },

        // Concatenating all of out scripts and generating a single app.concat.js (Applications Scripts) file and a single global.js (Other Global Scripts)
        concat: {
            app_and_global: {
                files: { // 'destination' : ['source1', 'source2',]
                    'app/javascripts/src/app.concat.js': [
                        'app/javascripts/src/app.js',
                        'app/javascripts/src/controllers/PrimaryController.js',
                        'app/javascripts/src/controllers/HomeController.js',
                        'app/javascripts/src/controllers/RecentCasesController.js',
                        'app/javascripts/src/controllers/RecentCaseDetailsController.js',
                        'app/javascripts/src/controllers/UploadImagesController.js',
                        'app/javascripts/src/controllers/CommonController.js',
                        'app/javascripts/src/services/CommonService.js'
                    ],
                    'app/javascripts/src/global.js': [
                        'app/javascripts/polyfills/classie.js',
                        'app/javascripts/polyfills/ua-detect.js',
                        'app/javascripts/polyfills/chosen-1.4.2.js',
                        'app/javascripts/src/custom/custom.js'
                    ]
                }
            }
        },

        // Minifying our Global JS file
        uglify: {
            prod_build: {
                files: {
                    'app/javascripts/dist/global.min.js' : ['app/javascripts/src/global.js'],
                    'app/javascripts/dist/app.min.js' : ['app/javascripts/src/app.concat.js']
                }
            }
        },

        // Watch Task to watch files for changes and run necessary tasks when changed
        watch: {
            css: {
                files: [
                    'app/stylesheets/src/**/**/*.scss' // This ensures we're watching for changes in the /src directory and any sub and sub-sub folders.
                ],
                tasks: ['sass', 'autoprefixer'], // The tasks we're running on the CSS
                options: {
                    spawn: false // This prevents Grunt from running the task as a child task which essentially just makes the watch a little faster.
                }
            },
            scripts: {
                files: ['app/javascripts/src/**/**/*.js'],
                tasks: ['jshint', 'concat'],
                options: {
                    spawn: false
                }
            }
        }

    });

    // Allows for the loading of multiple Grunt tasks without having to type, grunt.loadNpmTasks('the-task-name'); a million times.
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('prod', ['concat', 'uglify', 'sass', 'autoprefixer', 'cssmin']);
    grunt.registerTask('dev', ['watch']);

};
