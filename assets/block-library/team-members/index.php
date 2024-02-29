<?php
/**
 * Gutenberg block setup
 */

// enqueue block assets
wp_register_style( 'sinag-block-team-members-style', get_template_directory_uri() . '/dist/block-library/team-members/team-members-style.css', null, '1.0' );
wp_register_script( 'sinag-block-team-members-script', get_template_directory_uri() . '/dist/block-library/team-members/team-members-script.js', null, '1.0', true );

// register inner blocks
register_block_type( __DIR__ . '/team-member' );

// register the block
register_block_type( __DIR__, array(
	'style_handles' => ['sinag-block-team-members-style'],
	'view_script_handles' => ['sinag-block-team-members-script'],
	'render_callback' => function( $attributes, $content, $block ) {
		ob_start();
		get_template_part(
			'assets/block-library/' . basename( __DIR__ ) . '/team-members-markup',
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
