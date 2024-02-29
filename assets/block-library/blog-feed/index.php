<?php
/**
 * Gutenberg block setup
 */

// enqueue block assets
wp_register_style( 'sinag-block-blog-feed-style', get_template_directory_uri() . '/dist/block-library/blog-feed/blog-feed-style.css', null, '1.0' );

// register the block
register_block_type(
	__DIR__, array(
		'style_handles' => ['sinag-block-blog-feed-style'],
		'render_callback' => function( $attributes, $content, $block ) {
			ob_start();
			get_template_part(
				'assets/block-library/' . basename( __DIR__ ) . '/blog-feed-markup',
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
