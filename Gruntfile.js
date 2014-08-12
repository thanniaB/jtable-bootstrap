module.exports = function(grunt) {
    grunt.initConfig({

        test: {

        },
        serve: {

        },
        uglify: {
            dist: {
                src: ['jtable/*.js', 'vendor/**/*.js'],
                dest: 'all.min.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
}