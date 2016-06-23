module.exports = function(grunt) {
	
	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),
		
		less : {
            production : {
                files : {
                    'style.full.css' : 'less/style.less'
                }
            }
        },
		
		postcss : {
			options : {
				processors : [
                    /*
					require('pixrem')(), // add fallbacks for rem units
                    */
					require('autoprefixer')({
                        browsers : [
                            'last 3 versions',
                            '> 5% in US',
                            'IE 9-11'
                        ],
                        grid : false
                    }), // add vendor prefixes
					require('cssnano')() // minify the result
				]
			},
			dist: {
				src : 'style.full.css',
				dest : 'style.css'
			}
		},
		
		uglify : {
			my_target : {
				files : {
					'js/main.min.js' : 'js/main.js'
				}
			}
		},
		
		watch : {
			less : {
				files : ['less/*.less'],
				tasks : ['less','postcss']
			}
		}
		
	})
	
	// Load grunt plugins
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-uncss');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	// Default task
	//grunt.registerTask('default',['less']);
	grunt.registerTask('default',['less','postcss']);
	
};