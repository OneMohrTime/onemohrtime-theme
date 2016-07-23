module.exports = function(grunt) {
    
    // load all grunt tasks
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-postcss');
    
    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),
        
        watch : {
            files : '**/*.less',
            tasks : ['less','postcss']
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
        
        postcss : {
            options : {
                map : true, // inline sourcemaps
                processors : [
                    require('autoprefixer')({browsers: 'last 2 versions, > 2% in US, ie 9-11'}), // add vendor prefixes
                    require('cssnano')() // minify the result
                ]
            },
            dist : {
                src : 'style.css'
            }
        },
        
        uglify : {
            dist : {
                files : {
                    'js/main.min.js' : 'js/main.js'
                }
            }
		}
    });
    
    // Default task
    grunt.registerTask('default', ['less','postcss']);
    
};