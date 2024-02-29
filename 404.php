<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package Sinag
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">
			<?php if ( sinag_id() ) : ?>
				<?php echo apply_filters( 'the_content', get_post_field( 'post_content', sinag_id() ) ); ?>
			<?php else : ?>
				<div class="template-404">
					<div class="bsod container">
						<h1 class="neg title"><span class="bg">Error - 404</span></h1>
						<p>An error has occured, to continue:</p>
						<p>* Return to our homepage.<br />
							* Send us an e-mail about this error and try later.</p>
						<nav class="nav">
							<a href="<?php echo home_url(); ?>" class="link">homepage</a>&nbsp;|&nbsp;<a href="mailto:ray.sinag.dev@gmail.com?subject=404 Error (<?php echo home_url(); ?>)"
								class="link">webmaster</a>
						</nav>
					</div>
				</div>
			<?php endif; ?>
		</main>
	</div>

<?php get_footer();
