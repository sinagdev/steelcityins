<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Sinag
 */

?>

	</div><!-- #content (opened in header.php) -->

	<?php get_template_part( 'assets/component-library/footer/footer-markup' ); ?>

</div><!-- #page (opened in header.php) -->

<?php wp_footer(); ?>

<script>
  AOS.init();
</script>

</body>
</html>
