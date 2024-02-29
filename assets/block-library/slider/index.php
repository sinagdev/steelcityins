<?php
/**
 * Gutenberg block setup
 */

// enqueue block assets
wp_register_style( 'sinag-block-slider-style', get_template_directory_uri() . '/dist/block-library/slider/slider-style.css', null, '1.0' );

// register inner blocks
register_block_type( __DIR__ . '/slider-item' );

// register the block
register_block_type( __DIR__, array(
	'style_handles' => ['sinag-block-slider-style'],
	'render_callback' => function( $attributes, $content, $block ) {
		ob_start();
		get_template_part(
			'assets/block-library/' . basename( __DIR__ ) . '/slider-markup',
			null,
			array(
				'attributes' => $attributes,
				'content'    => $content,
				'block'      => $block,
			)
		);
		return ob_get_clean();
	},
) );
