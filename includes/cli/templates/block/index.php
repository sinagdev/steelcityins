<?php
/**
 * Gutenberg block setup
 */

// enqueue block assets
wp_register_style( 'sinag-block-template-slug-style', get_template_directory_uri() . '/dist/block-library/template-slug/template-slug-style.css', null, '1.0' );
/* PLACEHOLDER: enqueue front-end script */

/* PLACEHOLDER: register inner block */

// register the block
register_block_type( __DIR__, array(
	'style_handles' => ['sinag-block-template-slug-style'],
	/* PLACEHOLDER: add front-end script handle */
) );
