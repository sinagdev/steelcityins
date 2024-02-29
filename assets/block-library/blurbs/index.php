<?php
/**
 * Gutenberg block setup
 */

// enqueue block assets
wp_register_style( 'sinag-block-blurbs-style', get_template_directory_uri() . '/dist/block-library/blurbs/blurbs-style.css', null, '1.0' );

// register inner blocks
register_block_type( __DIR__ . '/blurb' );

// register the block
register_block_type( __DIR__, array(
	'style_handles' => ['sinag-block-blurbs-style'],
) );
