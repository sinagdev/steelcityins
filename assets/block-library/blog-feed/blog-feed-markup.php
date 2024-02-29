<?php
/**
 * Blog Feed dynamic block PHP.
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
$block_id = esc_attr($attributes['blockId']);
$slides_per_view = esc_html($attributes['slidesPerView']);

$post_args = [
	'posts_per_page' => $attributes['numberOfPosts'],
	'post_status' => 'publish',
	'order' => $attributes['order'],
	'orderby' => $attributes['orderBy'],
];

if (isset($attributes['categories'])) {
	$post_args['category__in'] = array_column($attributes['categories'], 'id');
}

$recent_posts = get_posts($post_args);

?>

<script type="module">
document.addEventListener('DOMContentLoaded', function () {
    new Swiper('#<?php echo $block_id; ?>', {
        slidesPerView: 1,
        spaceBetween: 30,
        setWrapperSize: true,
        watchOverflow: true,
        grabCursor: true,
        pagination: {
            el: '#<?php echo $block_id; ?> .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '#<?php echo $block_id; ?> .swiper-button-next',
            prevEl: '#<?php echo $block_id; ?> .swiper-button-prev',
        },
        breakpointsInverse: true,
        breakpoints: {
            768: {
                slidesPerView: 2.5
            },
            1200: {
                slidesPerView: <?php echo $slides_per_view; ?>,
            }
        },
    });
});
</script>

<div <?php echo get_block_wrapper_attributes(); ?>>
    <div class="swiper blogFeedSwiper" id="<?php echo $block_id; ?>" data-carousel="swiper">
        <div class="swiper-wrapper">
            <?php foreach ($recent_posts as $post):
                $title = get_the_title($post);
                $permalink = get_permalink($post);
                $excerpt = get_the_excerpt($post);
                $trimmed_excerpt = wp_trim_words($excerpt, 10);
            ?>
            <div class="swiper-slide blog-feed-card card sticky-action large">
                <div class="blog-feed-card__image card-image">
                    <?php if (has_post_thumbnail()): ?>
                        <?php echo get_the_post_thumbnail($post, 'full'); ?>
                    <?php else: ?>
                        <img src="<?php echo get_stylesheet_directory_uri() . '/screenshot.png'; ?>"
                             class="attachment-full size-full wp-post-image" decoding="async" loading="lazy"
                             alt="Fallback Image">
                    <?php endif; ?>
                </div>
                <div class="blog-feed-card__body card-content">
                    <span class="blog-feed-card__subtitle">Blog Feed posts</span>
                    <span class="blog-feed-card__title card-title"><?php echo $title; ?></span>
                    <?php if (!empty($excerpt)): ?>
                        <p class="blog-feed-card__text"><?php echo $trimmed_excerpt; ?></p>
                    <?php endif; ?>
                </div>
                <div class="card-action">
                    <a class="blog-feed-card__link btn waves-effect waves-teal" href="<?php echo $permalink; ?>">Read
                        More</a>
                </div>
            </div>
            <?php endforeach; ?>
        </div>

        <?php if ($attributes['addNavigation'] || $attributes['addPagination']): ?>
        <div class="swiper-controls">
            <?php if ($attributes['addPagination']): ?>
                <div class="swiper-pagination" data-swiper="pagination"></div>
            <?php endif; ?>
            <?php if ($attributes['addNavigation']): ?>
                <div class="swiper-navigation">
                    <div class="swiper-button-prev" data-swiper="prev"></div>
                    <div class="swiper-button-next" data-swiper="next"></div>
                </div>
            <?php endif; ?>
        </div><!-- .swiper-controls-->
        <?php endif; ?>
    </div><!-- .swiper -->
</div>
