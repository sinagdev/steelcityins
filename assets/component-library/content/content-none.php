<?php
/**
 * Template part for displaying a message that posts cannot be found
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Sinag
 */

?>

<article class="not-found torso entry-content has-global-padding is-layout-constrained">
	<?php if ( is_search() ) : ?>
		<p><?php esc_html_e( 'Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'sinag' ); ?></p>
	<?php else : ?>
		<p><?php esc_html_e( 'It seems we can&rsquo;t find what you&rsquo;re looking for.', 'sinag' ); ?></p>
	<?php endif; ?>
</article>
