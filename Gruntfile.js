'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        config: {
            hosts: {
                runtime: '0.0.0.0'
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
                '<%=config.paths.build%>'
            ]
        },
        jshint: {
            options: {
                jshintrc: '<%=config.paths.config%>/.jshintrc',
                reporter: require('jshint-junit-reporter'),
                reporterOutput: '<%=config.paths.results%>/jshint/jshint.xml'
            },
            files: {
                src: ['<%=config.paths.src%>/**/*.js']
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
            ifundit: {
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
                hostname: '<%= config.hosts.runtime%>'
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
                            connect().use('/' + config.paths.src + '/bower_components', connect.static('./bower_components')),
                            connect().use('/' + config.paths.src + '/fonts', connect.static('./bower_components/bootstrap/fonts')),
                            connect().use('/' + config.paths.src + '/js', connect.static(config.paths.instrumented + '/' + config.paths.src + '/js')),
                            connect().use('/' + config.paths.src, connect.static(config.paths.src)),
                            connect().use('/' + config.paths.test, connect.static(config.paths.test))
                        ];
                    }
                }
            }
        },
        protractor_coverage: {
            options: {
                keepAlive: true,
                noColor: false,
                debug: false,
                coverageDir: '<%=config.paths.results%>/protractor/coverage',
                args: {
                    resultsDir: '<%=config.paths.results%>/protractor',
                    baseUrl: 'http://<%= config.hosts.runtime %>:<%= connect.test.options.port %>',
                    specs: [
                        '<%=config.paths.test%>/protractor/**/*Spec.js'
                    ]
                }
            },
            local: {
                options: {
                    configFile: 'config/protractor-local.conf.js'
                }
            }
        },
        makeReport: {
            src: '<%=config.paths.results%>/protractor/coverage/*.json',
            options: {
                type: 'lcov',
                dir: '<%=config.paths.results%>/protractor/coverage',
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
            //},
            //html: {
            //    '<%=config.paths.src%>/{,*/}*.html'
            //
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
                    return './node_modules/bower/bin/bower update';
                }
            }
        }
    });

    grunt.registerTask('serve', 'Serve the app.', [
        'prepare',
        'package',
        'connect:dist',
        'watch'
    ]);

    grunt.registerTask('serve-runtime', 'Serve the app.', [
        'prepare',
        'package',
        'connect:runtime',
        'watch'
    ]);

    /** Prepare the build with all the necessary stuff. */
    grunt.registerTask('prepare', 'Prepare the build with all the necessary stuff.', [
        'clean',
        'shell:bowerupdate',
        'portPick'
    ]);

    grunt.registerTask('test', 'Execute tests.', [
        'force:on',
        'jshint',
        'karma',
        'instrument',
        'connect:test',
        'protractor_coverage',
        'makeReport',
        'force:reset'
    ]);

    grunt.registerTask('package', 'Package the code in a distributable format.', [
        'less',
        'copy',
        'ngtemplates',
        'concat',
        'htmlmin',
        'uglify',
        'cssmin',
        'usemin'
    ]);

    grunt.registerTask('release', 'Release if compliant to all checks.', function () {
        grunt.log.subhead('Not applicable yet build');
    });

    grunt.registerTask('default', [
        'prepare',
        'test',
        'verify',
        'package',
        'integration-test',
        'release'
    ]);
};
