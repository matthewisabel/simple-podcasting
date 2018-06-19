import gulp from 'gulp';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import pump from 'pump';

gulp.task( 'cssnext', ( cb ) => {
	const fileSrc = [
		'./assets/css/block-display.css',
		'./assets/css/block-editor.css',
		'./assets/css/podcasting-edit-term.css'
	];
	const fileDest = './dist';
	const cssNextOpts = {
		features: {
			autoprefixer: {
				browsers: ['last 2 versions']
			}
		}
	};
	const taskOpts = [
		require( 'postcss-import' ),
		require( 'postcss-cssnext' )( cssNextOpts )
	];

	pump( [
		gulp.src( fileSrc ),
		sourcemaps.init( {
			loadMaps: true
		} ),
		postcss( taskOpts ),
		sourcemaps.write( './css', {
			mapFile: function( mapFilePath ) {
				return mapFilePath.replace( '.css.map', '.min.css.map' );
			}
		} ),
		gulp.dest( fileDest )
	], cb );
} );