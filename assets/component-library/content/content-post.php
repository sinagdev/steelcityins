<?php
/**
 * Template part for displaying page content in single.php for posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Sinag
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'torso entry-content has-global-padding is-layout-constrained' ); ?>>
	<h1 class="post-content__title"><?php the_title(); ?></h1>
	<?php the_content(); ?>
</article>
