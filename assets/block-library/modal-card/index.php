<?php
/**
 * Gutenberg block setup
 */

// enqueue block assets
wp_register_style( 'sinag-block-modal-card-style', get_template_directory_uri() . '/dist/block-library/modal-card/modal-card-style.css', null, '1.0' );
wp_register_script( 'sinag-block-modal-card-script', get_template_directory_uri() . '/dist/block-library/modal-card/modal-card-script.js', null, '1.0', true );

// register inner blocks
register_block_type( __DIR__ . '/modal-card-item' );

// register the block
register_block_type( __DIR__, array(
	'style_handles' => ['sinag-block-modal-card-style'],
	'view_script_handles' => ['sinag-block-modal-card-script'],
) );
