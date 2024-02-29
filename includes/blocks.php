<?php
/**
 * Gutenberg Blocks setup
 * 
 * @package Sinag
 */

/**
 * Set up block editor feature support
 *
 * @see https://www.billerickson.net/building-a-gutenberg-website/#align-wide
 */
add_action( 'after_setup_theme', function() {

	// make embeds preserve aspect ratio
	add_theme_support( 'responsive-embeds' );

	// get rid of core patterns
	remove_theme_support( 'core-block-patterns' );

	// enable editor styles
	add_theme_support( 'editor-styles' );
	add_editor_style( '/dist/bundles/editor-styles.bundle.css' );

} );

/**
 * Enqueue back-end block editor content styling
 * 
 * Note: the recommended way to include these is via the
 * after_setup_theme hook, adding:
 * 
 * add_theme_support( 'editor-styles' );
 * add_editor_style( '/dist/bundles/editor.bundle.css' );
 *
 * We're manually enqueuing it here for now instead so we can use modern
 * CSS features without breaking back-end styles. It may be possible to
 * begin using editor-styles once the following issue is resolved:
 * 
 * @see https://github.com/WordPress/gutenberg/issues/40444
 * @see https://developer.wordpress.org/reference/functions/add_editor_style/#comment-5332
 */
add_action( 'enqueue_block_assets', 'sinag_editor_block_scripts' );
function sinag_editor_block_scripts() {

	if ( is_admin() ) {	
		wp_enqueue_style(
			'sinag-editor-style',
			get_template_directory_uri() . '/dist/bundles/editor.bundle.css',
			array(),
			sinag_cache_break( get_stylesheet_directory() .'/dist/bundles/editor.bundle.css' ),
			'screen'
		);
		
		/**
		 * Font Awesome
		 */
		wp_enqueue_script(
			'font-awesome-scripts',
			'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/js/all.min.js',
			array(),
			'6.2.1',
			true
		);
		wp_enqueue_style(
			'font-awesome-style',
			'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css',
			array(),
			'6.2.1'
		);

		/**
		 * Swiperjs
		 */
		wp_enqueue_script(
			'swiper-scripts',
			'https://cdnjs.cloudflare.com/ajax/libs/Swiper/10.3.0/swiper-bundle.min.js',
			array(), '10.3.0', false
		);

	}

}

/**
 * Enqueue front-end block scripts
 * 
 * Note: we do this via wp_enqueue_scripts rather than the usual
 * enqueue_block_assets so these only load on the front-end. We
 * include them on the back-end via @import "./*style.css";
 * statements in each block's editor.css file; that way we have the
 * option to remove the @import and implement custom editor styling.
 */
add_action( 'wp_enqueue_scripts', 'sinag_block_scripts' );
function sinag_block_scripts() {

	wp_enqueue_style(
		'sinag-block-style',
		get_template_directory_uri() . '/dist/bundles/blocks.bundle.css',
		array(),
		sinag_cache_break( get_stylesheet_directory() .'/dist/bundles/blocks.bundle.css' ),
		'screen'
	);
	wp_enqueue_script(
		'sinag-block-scripts',
		get_template_directory_uri() . '/dist/bundles/blocks.bundle.js',
		false,
		sinag_cache_break( get_stylesheet_directory() .'/dist/bundles/blocks.bundle.js' ),
		true
	);

}

/**
 * Enqueue back-end-only block editor scripts
 */
add_action( 'enqueue_block_editor_assets', 'sinag_editor_scripts' );
function sinag_editor_scripts() {

	wp_enqueue_script(
		'sinag-editor-scripts',
		get_template_directory_uri() . '/dist/bundles/editor.bundle.js',
		false,
		sinag_cache_break( get_stylesheet_directory() .'/dist/bundles/editor.bundle.js' ),
		true
	);
	wp_localize_script( 'sinag-editor-scripts', 'sinagLocalizedBlockEditor', array(
		'restUrl' => rtrim( get_rest_url(), '/' ),
		'siteUrl' => rtrim( get_home_url(), '/' ),
	) );

	// add browsersync helper (enables block editor CSS injecting within the iframe)
	wp_enqueue_script(
		'sinag-browsersync',
		get_template_directory_uri() . '/dist/build/browsersync.bundle.js',
		false,
		sinag_cache_break( get_stylesheet_directory() .'/dist/build/browsersync.bundle.js' ),
		true
	);

}

/**
 * Register all blocks in the block library
 */
add_action( 'init', function() {
	$blocks = glob( SINAG_ASSETS . '/block-library/*/index.php' );
	if ( $blocks ) {
		foreach ( $blocks as $block ) {
			require_once $block;
		}
	}
} );

/**
 * Execute hooks for blocks in the block library
 * 
 * Add a hooks.php file within any block directory to use
 * add_action or add_filter features (rather than adding
 * these hooks outside the block's directory within functions.php).
 */
$blocks = glob( SINAG_ASSETS . '/block-library/*/hooks.php' );
if ( $blocks ) {
	foreach ( $blocks as $block ) {
		require_once $block;
	}
}

/**
 * Add our own block category
 */
add_filter( 'block_categories' , function( $categories ) {
	$categories[] = array( 'slug'  => 'sinag-blocks', 'title' => __( 'Custom Blocks', 'sinag' ) );
	return $categories;
} );

/**
 * Manage Expose all synced patterns in the WordPress back-end sidebar
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-patterns/
 */
add_action( 'after_setup_theme', function() {

	// register sinag block category
	add_filter( 'block_categories', function( $categories, $post ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug' => 'sinag',
					'title' => __( 'Sinag', 'sinag' ),
				),
			)
		);
	}, 10, 2 );

} );

/**
 * Expose all synced patterns under Appearance > Synced Patterns
 * 
 * @link https://www.billerickson.net/reusable-blocks-accessible-in-wordpress-admin-area
 */
add_action( 'admin_menu', function() {
	add_submenu_page(
        'themes.php',
        __( 'Synced Patterns', 'sinag' ),
        __( 'Synced Patterns', 'sinag' ),
        'edit_posts',
        'edit.php?post_type=wp_block'
    );
} );

/**
 * Apply ugly hack to set correct root editor container classes
 * 
 * Setting settings.useRootPaddingAwareAlignments to true and settings.layout.type to
 * "constrained" should result in these classes being added properly, but it does not.
 * So, we add them manually. This allows front- and back-end layouts to match, since
 * both containers are wrapped with the same classes.
 * 
 * @see https://stackoverflow.com/questions/75912533/has-global-padding-not-added-to-is-root-container-in-wordpress
 */
add_action('admin_footer-post.php', 'sinag_root_editor_container_fix'); // Fired on post edit page
add_action('admin_footer-post-new.php', 'sinag_root_editor_container_fix'); // Fired on add new post page
function sinag_root_editor_container_fix() {
    echo "<script>
		function fixRoot() {
			var rootContainer = null;
			var editorCanvas = document.querySelector('iframe[name=\"editor-canvas\"]');
			if (editorCanvas) {
				rootContainer = editorCanvas.contentWindow.document.querySelector('.is-root-container');
			} else {
				rootContainer = document.querySelector('.is-root-container');
			}
			if (rootContainer) {
				if (!rootContainer.classList.contains('has-global-padding')) {
					rootContainer.classList.remove('is-layout-flow');
					rootContainer.classList.add('has-global-padding');
					rootContainer.classList.add('is-layout-constrained');
				} else {
					console.error('The theme is now adding .has-global-padding properly: you may remove this patch.');
				}
			}
		}
		typeof jQuery === 'function' && jQuery(document).ready(fixRoot);
		window.addEventListener('load', fixRoot);
	</script>";
};
