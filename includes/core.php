<?php
/**
 * Sinag standard theme setup.
 * 
 * @package Sinag
 */
add_action( 'after_setup_theme', 'sinag_setup' );
if ( ! function_exists( 'sinag_setup' ) ) {
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function sinag_setup() {

		/**
		 * Enqueue theme front-end styles and scripts
		 */
		add_action( 'wp_enqueue_scripts', 'sinag_theme_scripts' );
		function sinag_theme_scripts() {

			wp_enqueue_style(
				'sinag-style',
				get_template_directory_uri() . '/dist/bundles/theme.bundle.css',
				array(),
				sinag_cache_break( get_stylesheet_directory() .'/dist/bundles/theme.bundle.css' ),
				'screen'
			);
			wp_enqueue_script(
				'sinag-scripts',
				get_template_directory_uri() . '/dist/bundles/theme.bundle.js',
				false,
				sinag_cache_break( get_stylesheet_directory() .'/dist/bundles/theme.bundle.js' ),
				true
			);

		}

		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 */
		load_theme_textdomain( 'sinag', get_template_directory() . '/languages' );

		/**
		 * Add default posts and comments RSS feed links to head.
		 */
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		/**
		 * This theme uses wp_nav_menu() in two locations by default.
		 */
        register_nav_menus([
			'utility-menu' => esc_html__('Utility Menu', 'sinag'),
			'primary-menu' => esc_html__('Primary Menu', 'sinag'),
			'secondary-menu' => esc_html__('Secondary Menu', 'sinag'),
			'footer-menu' => esc_html__('Footer Menu', 'sinag'),
			'footer-legal' => esc_html__('Footer Legal', 'sinag'),
		]);

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		/**
		 * Add theme support for selective refresh for widgets.
		 */
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add theme attribution
		 */
		add_filter( 'admin_footer_text', 'sinag_custom_admin_footer' );
		function sinag_custom_admin_footer() {
			$svg = '<svg width="66" height="32" style="margin: 0 0 -5px -2.5px;" viewBox="0 0 66 32" fill="none" xmlns="http://www.w3.org/2000/svg">
			<circle cx="56" cy="10" r="4" fill="#DCBB49"/>
			<circle cx="56" cy="10" r="7.575" stroke="#DCBB49" stroke-width="0.85"/>
			<circle cx="56" cy="10" r="5.5" stroke="#DCBB49"/>
			<circle cx="56" cy="10" r="9.75" stroke="#DCBB49" stroke-width="0.5"/>
			<path d="M12.7109 24.6516C12.7109 25.3287 12.5469 25.9172 12.2188 26.4172C11.8906 26.9172 11.4115 27.3027 10.7812 27.5735C10.1562 27.8443 9.39583 27.9797 8.5 27.9797C8.10417 27.9797 7.71615 27.9537 7.33594 27.9016C6.96094 27.8495 6.59896 27.774 6.25 27.675C5.90625 27.5709 5.57812 27.4433 5.26562 27.2922V25.0422C5.80729 25.2818 6.36979 25.498 6.95312 25.6907C7.53646 25.8834 8.11458 25.9797 8.6875 25.9797C9.08333 25.9797 9.40104 25.9277 9.64062 25.8235C9.88542 25.7193 10.0625 25.5761 10.1719 25.3938C10.2812 25.2115 10.3359 25.0032 10.3359 24.7688C10.3359 24.4823 10.2396 24.2375 10.0469 24.0344C9.85417 23.8313 9.58854 23.6412 9.25 23.4641C8.91667 23.287 8.53906 23.0969 8.11719 22.8938C7.85156 22.7688 7.5625 22.6178 7.25 22.4407C6.9375 22.2584 6.64062 22.037 6.35938 21.7766C6.07812 21.5162 5.84635 21.2011 5.66406 20.8313C5.48698 20.4563 5.39844 20.0084 5.39844 19.4875C5.39844 18.8053 5.55469 18.2219 5.86719 17.7375C6.17969 17.2532 6.625 16.8834 7.20312 16.6282C7.78646 16.3678 8.47396 16.2375 9.26562 16.2375C9.85938 16.2375 10.4245 16.3079 10.9609 16.4485C11.5026 16.5839 12.0677 16.7818 12.6562 17.0422L11.875 18.925C11.349 18.7115 10.8776 18.5474 10.4609 18.4329C10.0443 18.3131 9.61979 18.2532 9.1875 18.2532C8.88542 18.2532 8.6276 18.3027 8.41406 18.4016C8.20052 18.4954 8.03906 18.6308 7.92969 18.8079C7.82031 18.9797 7.76562 19.1803 7.76562 19.4094C7.76562 19.6803 7.84375 19.9094 8 20.0969C8.16146 20.2792 8.40104 20.4563 8.71875 20.6282C9.04167 20.8 9.44271 21.0006 9.92188 21.2297C10.5052 21.5058 11.0026 21.7948 11.4141 22.0969C11.8307 22.3938 12.151 22.7454 12.375 23.1516C12.599 23.5527 12.7109 24.0527 12.7109 24.6516ZM16.9766 19.0891V27.8235H14.5938V19.0891H16.9766ZM15.7891 15.6672C16.1432 15.6672 16.4479 15.7506 16.7031 15.9172C16.9583 16.0787 17.0859 16.3834 17.0859 16.8313C17.0859 17.274 16.9583 17.5813 16.7031 17.7532C16.4479 17.9198 16.1432 18.0032 15.7891 18.0032C15.4297 18.0032 15.1224 17.9198 14.8672 17.7532C14.6172 17.5813 14.4922 17.274 14.4922 16.8313C14.4922 16.3834 14.6172 16.0787 14.8672 15.9172C15.1224 15.7506 15.4297 15.6672 15.7891 15.6672ZM24.4453 18.925C25.3776 18.925 26.1276 19.1803 26.6953 19.6907C27.263 20.1959 27.5469 21.0084 27.5469 22.1282V27.8235H25.1641V22.7219C25.1641 22.0969 25.0495 21.6256 24.8203 21.3079C24.5964 20.9902 24.2422 20.8313 23.7578 20.8313C23.0286 20.8313 22.5312 21.0787 22.2656 21.5735C22 22.0683 21.8672 22.7818 21.8672 23.7141V27.8235H19.4844V19.0891H21.3047L21.625 20.2063H21.7578C21.9453 19.9042 22.1771 19.6594 22.4531 19.4719C22.7344 19.2844 23.0443 19.1464 23.3828 19.0579C23.7266 18.9693 24.0807 18.925 24.4453 18.925ZM33.5781 18.9094C34.75 18.9094 35.6484 19.1646 36.2734 19.675C36.8984 20.1855 37.2109 20.9615 37.2109 22.0032V27.8235H35.5469L35.0859 26.636H35.0234C34.7734 26.9485 34.5182 27.2037 34.2578 27.4016C33.9974 27.5995 33.6979 27.7454 33.3594 27.8391C33.0208 27.9329 32.6094 27.9797 32.125 27.9797C31.6094 27.9797 31.1458 27.8808 30.7344 27.6829C30.3281 27.4849 30.0078 27.1829 29.7734 26.7766C29.5391 26.3652 29.4219 25.8443 29.4219 25.2141C29.4219 24.287 29.7474 23.6047 30.3984 23.1672C31.0495 22.7245 32.026 22.4797 33.3281 22.4329L34.8438 22.386V22.0032C34.8438 21.5448 34.724 21.2089 34.4844 20.9954C34.2448 20.7818 33.9115 20.675 33.4844 20.675C33.0625 20.675 32.6484 20.7349 32.2422 20.8547C31.8359 20.9745 31.4297 21.1256 31.0234 21.3079L30.2344 19.6985C30.6979 19.4537 31.2161 19.261 31.7891 19.1204C32.3672 18.9797 32.9635 18.9094 33.5781 18.9094ZM34.8438 23.7766L33.9219 23.8079C33.151 23.8287 32.6146 23.9667 32.3125 24.2219C32.0156 24.4771 31.8672 24.8131 31.8672 25.2297C31.8672 25.5943 31.974 25.8547 32.1875 26.011C32.401 26.162 32.6797 26.2375 33.0234 26.2375C33.5339 26.2375 33.9635 26.0865 34.3125 25.7844C34.6667 25.4823 34.8438 25.0527 34.8438 24.4954V23.7766ZM42.2266 31.6672C41.0078 31.6672 40.0755 31.4537 39.4297 31.0266C38.7891 30.6047 38.4688 30.011 38.4688 29.2454C38.4688 28.7193 38.6328 28.2792 38.9609 27.925C39.2891 27.5709 39.7708 27.3183 40.4062 27.1672C40.1615 27.0631 39.9479 26.8938 39.7656 26.6594C39.5833 26.4198 39.4922 26.1672 39.4922 25.9016C39.4922 25.5683 39.5885 25.2922 39.7812 25.0735C39.974 24.8495 40.2526 24.6308 40.6172 24.4172C40.1589 24.2193 39.7943 23.9016 39.5234 23.4641C39.2578 23.0266 39.125 22.511 39.125 21.9172C39.125 21.2818 39.263 20.7428 39.5391 20.3C39.8203 19.8521 40.2266 19.511 40.7578 19.2766C41.2943 19.0422 41.9453 18.925 42.7109 18.925C42.8724 18.925 43.0599 18.9355 43.2734 18.9563C43.487 18.9771 43.6823 19.0006 43.8594 19.0266C44.0417 19.0527 44.1641 19.0735 44.2266 19.0891H47.2734V20.3L45.9062 20.6516C46.0312 20.8443 46.125 21.05 46.1875 21.2688C46.25 21.4875 46.2812 21.7193 46.2812 21.9641C46.2812 22.9016 45.9531 23.6334 45.2969 24.1594C44.6458 24.6803 43.7396 24.9407 42.5781 24.9407C42.3021 24.925 42.0417 24.9042 41.7969 24.8782C41.6771 24.9719 41.5859 25.0709 41.5234 25.175C41.4609 25.2792 41.4297 25.3886 41.4297 25.5032C41.4297 25.6178 41.4766 25.7141 41.5703 25.7922C41.6693 25.8652 41.8151 25.9224 42.0078 25.9641C42.2057 26.0006 42.4505 26.0188 42.7422 26.0188H44.2266C45.1849 26.0188 45.9141 26.2245 46.4141 26.636C46.9193 27.0474 47.1719 27.6516 47.1719 28.4485C47.1719 29.4693 46.7448 30.261 45.8906 30.8235C45.0417 31.386 43.8203 31.6672 42.2266 31.6672ZM42.3281 30.1125C42.8958 30.1125 43.3828 30.0579 43.7891 29.9485C44.2005 29.8443 44.5156 29.6933 44.7344 29.4954C44.9531 29.3027 45.0625 29.0709 45.0625 28.8C45.0625 28.5813 44.9974 28.4068 44.8672 28.2766C44.7422 28.1516 44.5495 28.0631 44.2891 28.011C44.0339 27.9589 43.7057 27.9329 43.3047 27.9329H42.0703C41.7786 27.9329 41.5156 27.9797 41.2812 28.0735C41.0521 28.1672 40.8698 28.2974 40.7344 28.4641C40.599 28.636 40.5312 28.8339 40.5312 29.0579C40.5312 29.386 40.6875 29.6438 41 29.8313C41.3177 30.0188 41.7604 30.1125 42.3281 30.1125ZM42.7109 23.4875C43.1589 23.4875 43.487 23.3495 43.6953 23.0735C43.9036 22.7974 44.0078 22.4224 44.0078 21.9485C44.0078 21.4224 43.8984 21.0292 43.6797 20.7688C43.4661 20.5032 43.1432 20.3704 42.7109 20.3704C42.2734 20.3704 41.9453 20.5032 41.7266 20.7688C41.5078 21.0292 41.3984 21.4224 41.3984 21.9485C41.3984 22.4224 41.5052 22.7974 41.7188 23.0735C41.9375 23.3495 42.2682 23.4875 42.7109 23.4875Z" fill="black"/>
			</svg>';
			return '<span id="footer-thankyou">Theme by <a href="https://www.sinag.dev/" target="_blank">' . $svg . '</a></span>';
		}

		/**
		 * Aquamarine-ize the interface (from Admin Color Schemes plugin originally)
		 */
		add_action( 'admin_init' , 'sinag_aquamarine_colors' );
		function sinag_aquamarine_colors() {
			$user = wp_get_current_user();
			if ( 'aquaadmin' === $user->user_login ) {
				wp_admin_css_color(
					'aquamarine', __( 'Aquamarine', 'admin_schemes' ),
					get_template_directory_uri() . '/admin-aquamarine.css',
					array( '#1F2C39', '#2c3e50', '#1abc9c', '#f39c12' ),
					array( 'base' => '#f1f2f3', 'focus' => '#fff', 'current' => '#fff' )
				);
				// automatically use it for localhost
				if ( $_SERVER['REMOTE_ADDR'] === '127.0.0.1' && 'aquamarine' !== get_user_option( 'admin_color' ) ) {
					update_user_option( get_current_user_id(), 'admin_color', 'aquamarine' );
				}
			}
		}

		/**
		 * Disable unwanted WordPress scripts
		 */
		add_action( 'wp_enqueue_scripts', 'sinag_disable_scripts' );
		function sinag_disable_scripts() {

			wp_deregister_script( 'wp-embed' );
			remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
			remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
			remove_action( 'wp_print_styles', 'print_emoji_styles' );
			remove_action( 'admin_print_styles', 'print_emoji_styles' );
			remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
			remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
			remove_action( 'wp_print_styles', 'print_emoji_styles' );
			remove_action( 'admin_print_styles', 'print_emoji_styles' );
			remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
			remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
			remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
			remove_action( 'wp_head', 'wp_generator' );
			remove_action( 'wp_head', 'rsd_link' );
			add_filter( 'tiny_mce_plugins', function ( $plugins ) {
				if ( is_array( $plugins ) && in_array( 'wpemoji', $plugins, true ) ) {
					return array_diff( $plugins, array( 'wpemoji' ) );
				}
				return $plugins;
			} );
			add_filter( 'wp_resource_hints', function( $urls, $relation_type ) {
				if ( 'dns-prefetch' === $relation_type ) {
					$urls = array_values( array_diff( $urls, array( apply_filters( 'emoji_svg_url', 'https://s.w.org/images/core/emoji/2/svg/' ) ) ) );
				}
				return $urls;
			}, 10, 2 );

		}

	}
}
