module.exports = function(grunt) {

    grunt.initConfig({

        watch: {
            scripts: {
                files: ['./js/pagination.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                },
            },
        },

        uglify: {
            my_target: {
                files: {
                    './js/pagination.min.js': ['./js/pagination.js']
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['watch', 'uglify']);

}