<?php
/**
 * Gutenberg block setup
 */

// enqueue block assets
wp_register_style( 'sinag-block-cards-style', get_template_directory_uri() . '/dist/block-library/cards/cards-style.css', null, '1.0' );

// register inner blocks
register_block_type( __DIR__ . '/card' );

// register the block
register_block_type( __DIR__, array(
	'style_handles' => ['sinag-block-cards-style'],
) );
