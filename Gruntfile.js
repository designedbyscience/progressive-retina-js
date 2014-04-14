/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: 'Progressive Retina JS',
	concat: {
		options: {


		},      
		dist: {
			src: ['src/progressive-retina.js'],
			dest: 'dist/progressive-retina.js'
		}
	},

	clean: {
		dist: {
			src: ["dist/*"]
		}
	},
	copy:{
		dist: {
			files:[
				{ expand: true, cwd: "src/", src: ['**'], dest: 'dist/'}
			]
		}
	},
    uglify: {
      options: {
        banner: '/* <%= banner %> */ '
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/public/assets/javascript/app.min.js'
      }
    },

	removelogging: {
		dist: {
			src: "<%= concat.dist.dest %>",
			dest: "<%= concat.dist.dest %>",

			options: {
			// see below for options. this is optional.
			}
		}
	},
	
	
	jshint: {
		options: {
			curly: true,
			eqeqeq: true,
			immed: true,
			latedef: true,
			newcap: true,
			noarg: true,
			sub: true,
			undef: true,
			unused: true,
			boss: true,
			eqnull: true,
			browser: true,
			globals: {
				jQuery: true,
				$: true,
				console:true,
				Modernizr: true,
				choppingblock: true,
				require: true
			}
		},

		gruntfile: {
			src: 'Gruntfile.js'
		},
		dev:{
			src: ['src/progressive-retina.js']
		},
		qunit: {
			src: ['tests/*.js']
		}
	},
	qunit: {
		files: ['tests/*.html']
	},
	watch: {
		script: {
			files: ['src/*.js'],
			tasks: ['jshint:dev']		
			
		}
	}
 });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['jshint', 'concat', 'uglify' , 'compass']);
  grunt.registerTask('test', ['jshint:qunit', 'qunit']);
  grunt.registerTask('build', ['jshint:dev', 'compass:dev', 'qunit']);
  grunt.registerTask('distribute', ['jshint:dev', 'qunit', 'copy:dist', 'clean', 'concat', 'removelogging', 'uglify', 'compass:dist', 'usemin', 'imageoptim' ]);
};