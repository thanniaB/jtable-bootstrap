module.exports = function(grunt) {
    grunt.initConfig({

        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 9000,
                    keepalive: true,
                    open: true
                }
            }
        },
        uglify: {
            dist: {
                src: ['jquery.js', 'vendors/**/*.js',  'jtable/*.js'],
                dest: 'all.min.js'
            }
        },
        inline: {
            dist: {
                src: [ 'index.html' ],
                dest: 'index-inline.html'
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-inline');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('server', ['connect:server']);
}