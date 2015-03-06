'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        config: {
            hosts: {
                runtime: 'localhost'
            },
            paths: {
                tmp: '.tmp',
                base: require('path').resolve(),
                src: 'src',
                test: 'test',
                results: 'results',
                instrumented: 'instrumented',
                config: 'config',
                build: 'build'
            }
        },
        clean: {
            files: [
                '<%=config.paths.tmp%>',
                '<%=config.paths.results%>',
                '<%=config.paths.instrumented%>',
                '<%=config.paths.build%>',
                '<%=config.paths.src%>/css/*.css',
                '<%=config.paths.src%>/css/*.css.map',
                '<%=config.paths.src%>/js/templates.js'
            ]
        },
        jshint: {
            options: {
                jshintrc: '<%=config.paths.config%>/.jshintrc',
                reporter: require('jshint-junit-reporter'),
                reporterOutput: '<%=config.paths.results%>/jshint/jshint.xml'
            },
            files: {
                src: ['<%=config.paths.src%>/**/*.js',
                    '!<%=config.paths.src%>/**/templates.js']
            }
        },
        karma: {
            options: {
                singleRun: true,
                reporters: ['progress', 'coverage', 'junit']
            },
            unit: {
                configFile: '<%=config.paths.config%>/karma.conf.js'
            }
        },
        less: {
            development: {
                options: {
                    sourceMap: true,
                    sourceMapURL: 'workshop.css.map',
                    dumpLineNumbers: 'comments',
                    relativeUrls: true
                },
                files: {
                    "<%=config.paths.src%>/css/workshop.css": "<%=config.paths.src%>/css/workshop.less"
                }
            }
        },
        ngtemplates: {
            workshop: {
                options: {
                    module: 'workshop'
                },

                cwd: '<%=config.paths.src%>',
                src: 'partials/{,*/}*.html',
                dest: '<%=config.paths.src%>/js/templates.js'
            }
        },
        concat: {
            options: {
                separator: grunt.util.linefeed + ';' + grunt.util.linefeed
            },
            angular: {
                files: {
                    'build/js/angular.min.js': ['bower_components/angular/angular.min.js']
                }
            },
            modules: {
                files: {
                    'build/js/modules.min.js': [
                        'bower_components/angular-*/*.min.js'
                    ]
                }
            },
            plugins: {
                files: {
                    'build/js/plugins.min.js': [
                        'bower_components/jquery/dist/jquery.min.js'
                    ]
                }
            },
            workshop: {
                files: {
                    '.tmp/js/workshop.js': [
                        '<%=config.paths.src%>/js/workshop.js',
                        '<%=config.paths.src%>/js/**/*.js']
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! workshop <%= grunt.template.today("dd-mm-yyyy HH:MM:ss") %> */\n'
            },
            workshop: {
                files: {
                    'build/js/workshop.min.js': ['.tmp/js/workshop.js']
                }
            }
        },
        instrument: {
            files: '<%=config.paths.src%>/**/*.js',
            options: {
                basePath: '<%=config.paths.instrumented%>',
                lazy: false
            }
        },
        portPick: {
            options: {
                port: 9000
            },
            protractor: {
                targets: [
                    'connect.options.port'
                ]
            }
        },
        connect: {
            options: {
                port: 0,
                hostname: '0.0.0.0'
            },
            runtime: {
                options: {
                    open: {
                        target: 'http://<%= config.hosts.runtime%>:<%= connect.options.port%>'
                    },
                    middleware: function (connect) {
                        var config = grunt.config.get('config');

                        return [
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect().use('/fonts', connect.static('./bower_components/bootstrap/fonts')),
                            connect().use('/css', connect.static(config.paths.build + '/css')),
                            connect().use('/', connect.static(config.paths.src))
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: {
                        target: 'http://<%= config.hosts.runtime%>:<%= connect.options.port%>'
                    },
                    middleware: function (connect) {
                        return [
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect().use('/', connect.static(grunt.config.get('config').paths.build))
                        ];
                    }
                }
            },
            test: {
                options: {
                    open: false,
                    middleware: function (connect) {
                        var config = grunt.config.get('config');
                        return [
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect().use('/fonts', connect.static('./bower_components/bootstrap/fonts')),
                            connect().use('/css', connect.static(config.paths.build + '/css')),
                            connect().use('/js', connect.static(config.paths.instrumented + '/' + config.paths.src + '/js')),
                            connect().use('/', connect.static(config.paths.src))
                        ];
                    }
                }
            }
        },
        protractor_coverage: {
            options: {
                configFile: 'config/protractor-local.conf.js',
                keepAlive: true,
                noColor: false,
                debug: false,
                coverageDir: '<%=config.paths.results%>/protractor-coverage',
                args: {
                    baseUrl: 'http://<%= config.hosts.runtime %>:<%= connect.test.options.port %>',
                    resultsDir: '<%=config.paths.results%>/protractor',
                    specs: ['<%=config.paths.test%>/protractor/**/*Spec.js']
                }
            },
            locators: {
                options: {

                    coverageDir: '<%=config.paths.results%>/protractor-coverage',
                    args: {
                        baseUrl: 'http://<%= config.hosts.runtime %>:<%= connect.test.options.port %>',
                        resultsDir: '<%=config.paths.results%>/protractor',
                        specs: ['<%=config.paths.test%>/protractor/locator*Spec.js']
                    }
                }
            },
            interactions: {
                options: {
                    coverageDir: '<%=config.paths.results%>/protractor-coverage',
                    args: {
                        baseUrl: 'http://<%= config.hosts.runtime %>:<%= connect.test.options.port %>',
                        resultsDir: '<%=config.paths.results%>/protractor',
                        specs: ['<%=config.paths.test%>/protractor/interaction*Spec.js']
                    }
                }
            },
            chaining: {
                options: {
                    coverageDir: '<%=config.paths.results%>/protractor-coverage',
                    args: {
                        baseUrl: 'http://<%= config.hosts.runtime %>:<%= connect.test.options.port %>',
                        resultsDir: '<%=config.paths.results%>/protractor',
                        specs: ['<%=config.paths.test%>/protractor/chain*Spec.js']
                    }
                }
            },
            promises: {
                options: {
                    coverageDir: '<%=config.paths.results%>/protractor-coverage',
                    args: {
                        baseUrl: 'http://<%= config.hosts.runtime %>:<%= connect.test.options.port %>',
                        resultsDir: '<%=config.paths.results%>/protractor',
                        specs: ['<%=config.paths.test%>/protractor/promise*Spec.js']
                    }
                }
            }
        },
        makeReport: {
            src: '<%=config.paths.results%>/protractor-coverage/*.json',
            options: {
                type: 'lcov',
                dir: '<%=config.paths.results%>/protractor-coverage',
                print: 'detail'
            }
        },
        watch: {
            less: {
                files: ['<%=config.paths.src%>/css/{,*/}*.less'],
                tasks: ['less', 'copy']
            },
            js: {
                files: ['<%=config.paths.src%>/{,*/}*.js']
            },
            html: {
                files: ['<%=config.paths.src%>/partials/{,*/}*.html'],
                tasks: ['ngtemplates']
            }
        },
        copy: {
            workshop: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%=config.paths.src%>',
                        dest: '<%=config.paths.build%>',
                        src: [
                            'img/{,*/}*.{gif,webp,svg,png,jpg}'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%=config.paths.src%>',
                        dest: '<%=config.paths.build%>',
                        src: [
                            'css/{,*/}*.css.map'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/bootstrap',
                        dest: '<%=config.paths.build%>',
                        src: [
                            'fonts/{,*/}*.{eot,svg,ttf,woff}'
                        ]
                    }
                ]
            }
        },
        cssmin: {
            build: {
                files: {
                    'build/css/workshop.min.css': [
                        '<%=config.paths.src%>/css/workshop.css'
                    ]
                }
            }
        },
        htmlmin: {
            workshop: {
                options: {
                    removeComments: false,
                    collapseWhitespace: false
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%=config.paths.src%>',
                        src: ['*.html'],
                        dest: 'build'
                    }
                ]
            }
        },
        usemin: {
            html: ['build/{,*/}*.html'],
            css: ['build/css/{,*/}*.css'],
            options: {
                dirs: ['build']
            }
        },
        shell: {
            bowerupdate: {
                command: function () {
                    return './node_modules/bower/bin/bower install';
                }
            }
        }
    });


    grunt.registerTask('serve', 'Serve the app using the distribution .', [
        'prepare',
        'package',
        'connect:dist',
        'watch'
    ]);

    grunt.registerTask('serve-runtime', 'Serve the app with runtime watches.', [
        'prepare',
        'package',
        'connect:runtime',
        'watch'
    ]);

    grunt.registerTask('prepare', 'Prepare the build with all the necessary stuff.', [
        'clean',
        //'shell:bowerupdate',
        'portPick',
        'less',
        'copy',
        'ngtemplates'
    ]);

    grunt.registerTask('test', 'Execute tests.', function (suite) {
        var coverageTask = 'protractor_coverage';
        if (typeof suite === 'string' && suite !== 'undefined') {
            coverageTask += ':' + suite;
        }
        grunt.task.run([
            'force:on',
            'jshint',
            'karma',
            'instrument',
            'connect:test',
            coverageTask,
            'makeReport',
            'force:reset'
        ]);
    });

    grunt.registerTask('package', 'Package the code in a distributable format.', [
        'concat',
        'htmlmin',
        'uglify',
        'cssmin',
        'usemin'
    ]);

    grunt.registerTask('release', 'Release if compliant to all checks.', function () {
        grunt.log.subhead('Not applicable yet build');
    });

    grunt.registerTask('default', 'Default task', function (suite) {
        grunt.task.run([
            'prepare',
            'test:' + suite,
            'package',
            'release'
        ]);
    });
};
