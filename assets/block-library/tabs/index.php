<?php
/**
 * Gutenberg block setup
 */

// enqueue block assets
wp_register_style( 'sinag-block-tabs-style', get_template_directory_uri() . '/dist/block-library/tabs/tabs-style.css', null, '1.0' );
wp_register_script( 'sinag-block-tabs-script', get_template_directory_uri() . '/dist/block-library/tabs/tabs-script.js', null, '1.0', true );

// register inner blocks
register_block_type( __DIR__ . '/tabs-item' );

// register the block
register_block_type( __DIR__, array(
	'style_handles' => ['sinag-block-tabs-style'],
	'view_script_handles' => ['sinag-block-tabs-script'],
) );
