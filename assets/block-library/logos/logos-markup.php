<?php
/**
 * Logos dynamic block PHP.
 *
 * This file renders the dynamic block.
 *
 * @param  array $args                     Arguments from get_template call.
 * @param  array $args[ 'attributes' ]  Block attributes.
 * @param  array $args[ 'content' ]     Block content.
 * @param  array $args[ 'block' ]       Block instance.
 * @return string
 */

$attributes = $args['attributes'];
$content = $args['content'];
$block_id = esc_attr($attributes['blockId']);
$slides_per_view = esc_html($attributes['slidesPerView']);
?>
<script type="module">

new Swiper('#<?php echo $block_id; ?>', {
		slidesPerView: 1,
		spaceBetween: 15,
		loop: true,
		speed: <?php echo $attributes['slideSpeed'] * 1000;?>,
		breakpoints: {
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: <?php echo $slides_per_view; ?>,
            spaceBetween: 50,
          },
		},
		autoplay: {
			delay: 10,
			disableOnInteraction: false,
			pauseOnMouseEnter: true
		},
		watchSlidesVisibility: true,
		lazy:{
			loadPrevNext: true,
			loadOnTransitionStart: true,
		}
	});
</script>

<div <?php echo get_block_wrapper_attributes(); ?>>
	<div class="swiper logosSwiper" id="<?php echo $block_id; ?>" data-carousel="swiper">
		<div class="swiper-wrapper">
			<?php echo $content; ?>
		</div>
	</div>
</div>