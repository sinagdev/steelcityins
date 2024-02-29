<?php
/**
 * Slider dynamic block PHP.
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
$loopSetting = $attributes['isSlideLoop'] === true ? 'true' : 'false';
$slides_per_view = esc_html($attributes['slidesPerView']);
?>
<script type="module">

new Swiper('#<?php echo $block_id; ?>', {
		slidesPerView: 1,
		spaceBetween: 15,
		loop: <?php echo $loopSetting; ?>,
		speed: <?php echo $attributes['slideSpeed'] * 1000; ?>,
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
		speed: 1000,
		watchSlidesVisibility: true,
		lazy:{
			loadPrevNext: true,
			loadOnTransitionStart: true,
		},
        pagination: {
            el: '#<?php echo $block_id; ?> .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '#<?php echo $block_id; ?> .swiper-button-next',
            prevEl: '#<?php echo $block_id; ?> .swiper-button-prev',
        },
	});
</script>

<div <?php echo get_block_wrapper_attributes(); ?>>
	<div class="swiper sliderSwiper" id="<?php echo $block_id; ?>" data-carousel="swiper">
		<div class="swiper-wrapper">
			<?php echo $content; ?>
		</div>

		<?php if (
			$attributes['addNavigation'] |
			($attributes['addPagination'] === true)
		): ?>
		<div class="swiper-controls">

		<?php if ($attributes['addPagination'] === true): ?>
			<div class="swiper-pagination" data-swiper="pagination"></div>
		<?php endif; ?>

		<?php if ($attributes['addNavigation'] === true): ?>
			<div class="swiper-navigation">
				<div class="swiper-button-prev" data-swiper="prev"></div>
				<div class="swiper-button-next" data-swiper="next"></div>
			</div>
		<?php endif; ?>
		</div><!-- .swiper-controls-->
		<?php endif; ?>
	</div>
</div>