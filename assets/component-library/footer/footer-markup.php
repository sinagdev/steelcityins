<footer id="colophon" class="site-footer">
    <?php
    // Get the values from theme customizer
    $footer_logo_url = get_theme_mod('footer_logo');
    $footer_credits_logo_url = get_theme_mod('footer_credits_logo');
    $footer_credits_url = get_theme_mod('footer_credits_url');
    ?>

    <?php if ($footer_logo_url): ?>
        <div class="footer-logo"><img src="<?php echo esc_url($footer_logo_url); ?>" alt="Footer Logo"></div>
    <?php else: ?>
        <div class="footer-logo"><img src="<?php echo esc_url(get_theme_file_uri('/assets/static/footer_logo.svg')); ?>"
                alt="Footer Logo (Fallback)"></div>
    <?php endif ?>

    <div class="site-footer__main">
        <div class="container">
            <div class="row">
                <div class="site-footer__content col s12 <?php if (has_nav_menu('footer-menu')): ?> m6 <?php endif; ?>">
                    <?php
                    $footer = get_posts(array(
                        'name' => 'footer',
                        'post_type' => 'sinag-general',
                        'posts_per_page' => 1,
                        'fields' => 'ids'
                    ));
                    if ($footer) {
                        echo apply_filters('the_content', get_post_field('post_content', $footer[0]));
                    }
                    ?>
                </div>
                <?php if (has_nav_menu('footer-menu')): ?>
                    <div class="site-footer__links col s12 m4 offset-m2">
                        <h4 class="site-footer__link-heading">Links</h4>
                        <?php wp_nav_menu([
                            'container_id' => 'footer-navigation',
                            'container_class' => 'site-footer__links-container',
                            'theme_location' => 'footer-menu',
                            'menu_class' => 'site-footer__links-list grey-text text-lighten-3',
                        ]); ?>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <div class="site-footer__credits">
        <?php
        // Display Footer Credits and Footer Credits URL only if both are present
        if ($footer_credits_url): ?>
            <p>Powered by</p>
            <a href="<?php echo esc_url($footer_credits_url); ?>">
                <?php if ($footer_credits_logo_url): ?>
                    <img src="<?php echo esc_url($footer_credits_logo_url); ?>" alt="Footer Credits Logo">
                <?php else: ?>
                    <img src="<?php echo esc_url(get_theme_file_uri('/assets/static/ami_logo.svg')); ?>"
                        alt="Footer Credits Logo (Fallback)">
                <?php endif ?>
            </a>
        <?php endif ?>
        <p class="copyright"> Copyright © <?php echo date("Y"); ?>. All rights reserved</p>
    </div>

</footer>