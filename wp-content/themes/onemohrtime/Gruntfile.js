module.exports = function(grunt) {
    
    // load all grunt tasks
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),
        
        watch : {
            files : '**/*.less',
            tasks : ['less']
        },
        
        less: {
            development: {
                options: {
                    paths : [''],
                },
                files: {
                    // compilation.css  :  source.less
                    'style.full.css' : 'less/style.less'
                }
            },
            production : {
                options: {
                    paths : [''],
                },
                files: {
                    // compilation.css  :  source.less
                    'style.css' : 'less/style.less'
                }
            }
        },
        
        uglify : {
            files : {
                'js/main.min.js' : 'js/main.js'
            }
		}
    });
    
    // Default task
    grunt.registerTask('default', ['watch']);
    
};