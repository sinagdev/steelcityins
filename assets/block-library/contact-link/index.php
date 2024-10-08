<?php
/**
 * Gutenberg block setup
 */

// enqueue block assets
wp_register_style( 'sinag-block-contact-link-style', get_template_directory_uri() . '/dist/block-library/contact-link/contact-link-style.css', null, '1.0' );

// register the block
register_block_type( __DIR__, array(
	'style_handles' => ['sinag-block-contact-link-style'],
) );
