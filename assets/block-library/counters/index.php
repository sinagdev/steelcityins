<?php
/**
 * Gutenberg block setup
 */

// enqueue block assets
wp_register_style( 'sinag-block-counters-style', get_template_directory_uri() . '/dist/block-library/counters/counters-style.css', null, '1.0' );
wp_register_script( 'sinag-block-counters-script', get_template_directory_uri() . '/dist/block-library/counters/counters-script.js', null, '1.0', true );

// register the block
register_block_type(
	__DIR__, array(
		'style_handles' => ['sinag-block-counters-style'],
		'view_script_handles' => ['sinag-block-counters-script'],
		'render_callback' => function( $attributes, $content, $block ) {
			ob_start();
			get_template_part(
				'assets/block-library/' . basename( __DIR__ ) . '/counters-markup',
				null,
				array(
					'attributes' => $attributes,
					'content'    => $content,
					'block'      => $block,
				)
			);
			return ob_get_clean();
		},
	)
);
