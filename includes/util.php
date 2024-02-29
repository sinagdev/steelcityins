<?php
/**
 * Library of common sinag utility functions
 * 
 * @package Sinag
 */

 /**
 * Easy conditional print.
 *
 * Like printf/sprintf but only outputs the string (usually
 * HTML) if none of the values are false.
 * 
 * Example:
 * 
 * $heading = single_cat_title(); // this will be false on e.g. page.php
 * $blurb = "Some text.";
 * // echo nothing (printf would output <h1></h1><p>Some text.</p> with empty H1)
 * if_printf( '<h1>%s</h1><p>%s</p>', $heading, $blurb );
 */
function if_sprintf( $sprintf, ...$items ) {
	// get the first value and continue if it exists
	$first = array_shift( $items );
	if ( sinag_is_truty_or_zero( $first ) ) {
		// simply return it if that's all we've got (90% of the time it's just one argument)
		if ( ! $items ) {
			return sprintf( $sprintf, $first );
		} else {
			// if any remaining items don't exist then return an empty string
			foreach ( $items as $item ) {
				if ( ! sinag_is_truty_or_zero( $item ) ) {
					return '';
				}
			}
			// return the sprintf result if all items exist
			return call_user_func_array( 'sprintf', array_merge( (array) $sprintf, (array) $first, $items ) );
		}
	}
}

// echo rather than return string
function if_printf( $sprintf, ...$item ) {
	echo if_sprintf( $sprintf, ...$item );
}

// check truthy but allow 0, '0', 0.0, etc.
function sinag_is_truty_or_zero( $mixed ) {
	return ( !! $mixed || is_int( $mixed ) || is_float( $mixed ) || '0' === $mixed );
}

/**
 * Break file cache by appending `?ver={timestamp}` to the URL.
 * 
 * Note: if you'd rather manually break cache, just
 * replace the return line with e.g. `return '1.0.0'`.
 * 
 * @param  string  $path  File URI.
 * @return string         File URI with cache break appended.
 */
function sinag_cache_break(  $path )  {
	return file_exists( $path ) ? @filemtime( $path ) : 1;
}

/**
 * Setup general content (like footers)
 */
add_action( 'after_setup_theme', 'sinag_general_custom_post_type' );
function sinag_general_custom_post_type() {
	register_post_type(
		'sinag-general',
		array(
			'labels' => array(
				'name' => _x( 'Global Content', 'Taxonomy General Name', 'sinag' ),
				'singular_name' => _x( 'Global Content', 'Taxonopmy Singular Name', 'sinag' ),
				'menu_name' => __( 'Global Content', 'sinag' ),
				'all_items' => __( 'Global Content', 'sinag' ),
				'parent_item' => __( 'Parent Global Content', 'sinag' ),
				'parent_item_colon' => __( 'Parent Global Content:', 'sinag' ),
				'new_item_name' => __( 'New Global Content Name', 'sinag' ),
				'add_new_item' => __( 'Add New Global Content', 'sinag' ),
				'edit_item' => __( 'Edit Global Content', 'sinag' ),
				'update_item' => __( 'Update Global Content', 'sinag' ),
				'separate_items_with_commas' => __( 'Separate Global Content with commas', 'sinag' ),
				'search_items' => __( 'Search Global Content', 'sinag' ),
				'add_or_remove_items' => __( 'Add or remove items', 'sinag' ),
				'choose_from_most_used' => __( 'Choose from the most used items', 'sinag' ),
				'not_found' => __( 'Not Found', 'sinag' ),
			),
			'public' => false,
			'show_in_rest' => true,
			'show_in_menu' => 'themes.php',
			'show_in_nav_menus' => true,
			'show_ui' => true,
			'menu_position' => 20,
			'menu_icon' => 'dashicons-button',
			'supports' => array(
				'editor',
				'custom-fields',
				'title',
				'thumbnail',
			),
		)
	);
}

/**
 * Get disambiguated number (e.g. for unique IDs)
 */
function sinag_disambiguate() {

	// set an unique increment variable if it's not already set
	if ( ! isset( $GLOBALS[ 'disambiguation_incrament' ] ) ) {
		$GLOBALS[ 'disambiguation_incrament' ] = 0;
	}
	// store the unique number after incrementing
	$unique_number = ++$GLOBALS[ 'disambiguation_incrament' ];

	// return it
	return $unique_number;
}

/**
 * Add custom scripts
 * 
 * Adds fields for adding custom embed scripts at
 * ...</head>, <body>..., and/or ...</body>. Options
 * page available under Settings > Custom Scripts.
 * 
 * Supports shortcodes, so you could create a shortcode
 * for excluding a specific post type, list of page
 * IDS, etc. if necessary.
 */

// create the settings page
add_action( 'admin_menu', 'sinag_create_custom_scripts_options_page' );
function sinag_create_custom_scripts_options_page() {
	add_options_page( __( 'Custom Scripts', 'sinag' ), __( 'Custom Scripts', 'sinag' ), 'administrator', __FILE__, function() {
		ob_start();
			settings_fields('sinag_custom_scripts');
		$fields = ob_get_clean();
		ob_start();
			do_settings_sections(__FILE__);
		$section = ob_get_clean();
		printf(
			'<form method="post" action="options.php" enctype="multipart/form-data">
				%s%s
				<input name="Submit" type="submit" class="button-primary" value="%s" />
			</form>',
			$fields,
			$section,
			__( 'Save Changes', 'sinag' )
		);
	});
}

// register custom script fields
add_action( 'admin_init', 'sinag_register_custom_scripts_fields' );
function sinag_register_custom_scripts_fields() {
	register_setting( 'sinag_custom_scripts', 'sinag_custom_scripts', null ) ;
	add_settings_section('main_section', 'Custom Scripts', function() {
		printf( '<p>%s</p>', __( 'Embed scripts on the front-end of the website.', 'sinag' ) );
		printf( '<div class="update-nag notice notice-warning inline">%s</div>', __( 'WARNING: be very carful changing these settings, or you could break your site.', 'sinag' ) );
	}, __FILE__);
	add_settings_field( 'sinag_custom_scripts_closing_header', 'Before closing &lt;/head&gt;', function() {
		$options = get_option( 'sinag_custom_scripts' );
		$code = $options['sinag_custom_scripts_closing_header'] ?? '';
		echo '<textarea name="sinag_custom_scripts[sinag_custom_scripts_closing_header]" rows="10" cols="60" type="textarea">' . $code . '</textarea>';
	}, __FILE__, 'main_section');
	add_settings_field( 'sinag_custom_scripts_opening_body', 'Before opening &lt;body&gt;', function() {
		$options = get_option( 'sinag_custom_scripts' );
		$code = $options['sinag_custom_scripts_opening_body'] ?? '';
		echo '<textarea name="sinag_custom_scripts[sinag_custom_scripts_opening_body]" rows="10" cols="60" type="textarea">' . $code . '</textarea>';
	}, __FILE__, 'main_section');
	add_settings_field( 'sinag_custom_scripts_closing_body', 'Before closing &lt;/body&gt;', function() {
		$options = get_option( 'sinag_custom_scripts' );
		$code = $options['sinag_custom_scripts_closing_body'] ?? '';
		echo '<textarea name="sinag_custom_scripts[sinag_custom_scripts_closing_body]" rows="10" cols="60" type="textarea">' . $code . '</textarea>';
	}, __FILE__, 'main_section');
}

// add code to appropriate places in theme
add_action( 'wp_head', function() {
	$options = get_option( 'sinag_custom_scripts' );
	echo do_shortcode( $options['sinag_custom_scripts_closing_header'] ?? '' );
}, 99 );
add_action( 'wp_body_open', function() {
	$options = get_option( 'sinag_custom_scripts' );
	echo do_shortcode( $options['sinag_custom_scripts_opening_body'] ?? '' );
}, 99 );
add_action( 'wp_footer', function() {
	$options = get_option( 'sinag_custom_scripts' );
	echo do_shortcode( $options['sinag_custom_scripts_closing_body'] ?? '' );
}, 99 );

/**
 * Add pagination.
 *
 * Use following a loop displaying posts that may contain pagination.
 *
 * @param  string $class Optional. Class to add to the wrapper.
 * @param  string $prev_text Optional. Text to show for previous button (default "Previous").
 * @param  string $next_text Optional. Text to show for next button (default "Next").
 * @param  string $show_disabled Optional. Show disabled prev/next buttons (default is false).
 */
function sinag_pagination( $class = 'pagination', $prev_text = '', $next_text = '', $show_disabled = false ) {
	global $wp_query;
	$big = 999999999;
	$prev_text = ( '' !== $prev_text ? $prev_text : __( 'Previous', 'sinag' ) );
	$next_text = ( '' !== $next_text ? $next_text : __( 'Next', 'sinag' ) );
	$nav = paginate_links( array(
	    'base'      => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
	    'format'    => '?paged=%#%',
	    'prev_text' => $prev_text,
	    'current'   => max( 1, get_query_var( 'paged' ) ),
	    'total'     => $wp_query->max_num_pages,
	    'next_text' => $next_text,
	) );
	if ( $nav ) {
		$html = $nav;
		if ( $show_disabled ) {
			if ( stripos( $html, 'prev page-numbers' ) === false ) {
				$html = ' <a href="javascript:void(0)" aria-disabled="true" class="prev page-numbers">' . $prev_text . '</a> ' . $html;
			}
			if ( stripos( $html, 'next page-numbers' ) === false ) {
				$html = $html . ' <a href="javascript:void(0)" aria-disabled="true" class="next page-numbers">' . $next_text . '</a> ';
			}
		}
		echo '<div class="' . $class . '">' . $html . '</div>';
	}
}

/**
 * Add ani to dynamic blocks
 */
add_filter( 'render_block', 'aqua_dynamic_ani', 10, 2 );
function aqua_dynamic_ani( $block_content, $block ) {

	// start with no custom class names
	$classes = '';

	// handle animation classes
	if ( ! empty( $block[ 'attrs' ][ 'sinagClassNameAni' ] ) ) {
		$classes .= ' ani ' . implode( ' ',  array_map( function( $ani ) {
			return $ani[ 'value' ];
		}, $block[ 'attrs' ][ 'sinagClassNameAni' ] ) );
	}

	// handle hide/show responsiveness
	if ( ! empty( $block[ 'attrs' ][ 'sinagClassNameHide' ] ) ) {
		$classes .= ' ' . implode( ' ',  array_map( function( $ani ) {
			return $ani[ 'value' ];
		}, $block[ 'attrs' ][ 'sinagClassNameHide' ] ) );
	}

	// if we have new stuff then send it
	if ( $classes && $block_content ) {
		return preg_replace(
			'/' . preg_quote( 'class="', '/' ) . '/',
			'class="' . trim( esc_attr( $classes ) ) . ' ',
			$block_content,
			1
		);
	}
	// just return things unchanged by default
	return $block_content;
}

/**
 * Set page ID to use.
 *
 * Useful, for example, for using the title
 * from a page named Blog for all post archives.
 * You'd just do:
 *     `echo get_the_title( sinag_id() );`
 * on archive.php, tag.php, etc.
 *
 * @return integer
 */
function sinag_id() {

	$the_id = $GLOBALS[ 'sinag_current_id' ] ?? null;

	if ( ! $the_id ) {

		// start with a default
		$the_id = get_the_id();

		// use page set as the "posts page" for blog-like templates
		if ( get_option( 'page_for_posts' )
			&& ( is_singular( 'post' )
				|| is_post_type_archive( 'post' )
				|| is_category()
				|| is_tag()
				|| is_home()
			)
		) {
			$the_id = get_option( 'page_for_posts' );
		// use a page with slug "404-page" for the 404 page id
		} elseif ( is_404() ) {
			if ( $post = get_page_by_path( '404-page', OBJECT, 'page' ) ) {
				$the_id = $post->ID;
			}
		}

		$GLOBALS[ 'sinag_current_id' ] = $the_id;

	}

	return $the_id;
}

/**
 * Allow access to current background color var
 *
 * This let's you do things like:
 *	.thing {
 *		border: 1px solid var(--c-bg);
 * 	}
 * So, for .thing.has-0-000-background-color
 * you'll get a black border, and for
 * .thing.has-0-900-background-color you'll
 * get a white border, matching their respective
 * backgrounds. It's often quite useful.
 */
add_action( 'wp_head', 'sinag_bg_css' );
add_action( 'admin_head', 'sinag_bg_css' );
function sinag_bg_css() {
	$colors = wp_get_global_settings( array( 'color', 'palette', 'theme' ) );
	if ( $colors ) {
		echo '<style>';
		foreach( $colors as $color ) {
			echo '.has-' . $color[ 'slug' ] . '-background-color { --c-bg: var(--c-' . $color[ 'slug' ] . ') } /* ' . $color[ 'name' ] . " */\n";
		}
		echo '</style>';
	}
}


/**
 * Custom Logo Support
 *
 * Update the width and height to match the designs logo.
 *
 * When selecting an image in the customizers site identity panel,
 * if the image is larger than the defined specs, make sure to
 * select the whole image and hit crop. If it is smaller than the
 * defined dimensions, just hit skip cropping.
 */
function add_custom_logo()
{
	add_theme_support('custom-logo', [
		'flex-height' => true,
	]);
}
add_action( 'after_setup_theme', 'add_custom_logo' );

function change_logo_class( $html ) {

    $html = str_replace( 'custom-logo-link', 'custom-logo-link brand-logo', $html );

    return $html;
}
add_filter( 'get_custom_logo', 'change_logo_class' );

/**
 * Outputs the theme custom favicon or a fallback favicon if not uploaded
 * @return string Returns a link tag for favicon
 */
function the_favicon()
{
    $favicon = get_site_icon_url();

    if ($favicon) {
        echo '<link rel="icon" type="image/x-icon" href="' . esc_url($favicon) . '" />';
    } else {
        echo '<link rel="icon" type="image/png" href="' . esc_url(get_template_directory_uri() . '/assets/static/favicon.png') . '" />';
    }
}

/**
 * Outputs the theme custom logo if it exists
 * @return string Returns an image tag
 */
function the_logo()
{
	if (function_exists('the_custom_logo') && has_custom_logo()) {
		the_custom_logo();
	} else {
		printf(
			'<a class="%s" href="%s"><img src="%s/assets/static/logo.svg" height="40" alt="%s (Fallback)"/></a>',
			'custom-logo-link',
			get_bloginfo('url'),
			get_template_directory_uri(),
			get_bloginfo('title')
		);
	}
}

/**
 * Footer Logo
 */

 function theme_customizer_settings($wp_customize) {
    // Add section for Footer
    $wp_customize->add_section('footer_section', array(
        'title'    => __('Footer Settings', 'your-theme-slug'),
        'priority' => 30,
    ));

    // Add setting for Footer Logo
    $wp_customize->add_setting('footer_logo', array(
        'default'           => '',
        'sanitize_callback' => 'esc_url_raw',
    ));

    // Add control for Footer Logo
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'footer_logo', array(
        'label'    => __('Upload Footer Logo', 'your-theme-slug'),
        'section'  => 'footer_section',
        'settings' => 'footer_logo',
    )));

    // Add setting for Footer Credits Logo
    $wp_customize->add_setting('footer_credits_logo', array(
        'default'           => '',
        'sanitize_callback' => 'esc_url_raw',
    ));

    // Add control for Footer Credits Logo
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'footer_credits_logo', array(
        'label'    => __('Upload Footer Credits Logo', 'your-theme-slug'),
        'section'  => 'footer_section',
        'settings' => 'footer_credits_logo',
    )));

    // Add setting for Footer Credits URL
    $wp_customize->add_setting('footer_credits_url', array(
        'default'           => '',
        'sanitize_callback' => 'esc_url_raw',
    ));

    // Add control for Footer Credits URL
    $wp_customize->add_control('footer_credits_url', array(
        'label'    => __('Footer Credits URL', 'your-theme-slug'),
        'section'  => 'footer_section',
        'settings' => 'footer_credits_url',
        'type'     => 'url',
    ));
}

add_action('customize_register', 'theme_customizer_settings');


/**
 * Outputs the search form.
 *
 * @since 0.7.3
 *
 * @param array $args {
 *     Optional. Array of display arguments.
 *
 *     @type string $title            The title of the form.
 *     @type string $placeholder      The placeholder of the form.
 *     @type string $aria-label       ARIA label for the search form. Useful to distinguish
 *                                    multiple search forms on the same page and improve
 *                                    accessibility. Default empty.
 *     @type string $aria-describedby ARIA label for the search form. Useful to distinguish
 *                                    multiple search forms on the same page and improve
 *                                    accessibility. Default empty.
 *     @type array $button {
 *       @type string 'class'         The button class.
 *       @type string 'text'          The button text.
 *     }
 *  }
 */
function sinag_search_form( array $args = array() ) {
	global $sinag_search_form_atts;
	$default_args              = array(
		'form_id'          => 'search',
		'form_class'       => 'searchform',
		'input_id'         => 'search-input',
		'title'            => 'Search',
		'placeholder'      => 'Search',
		'aria-label'       => 'Search',
		'aria-describedby' => 'search-btn',
		'button'           => array(
			'class' => 'btn waves-effect waves-light',
			'text'  => '<i class="material-icons">search</i>',
		),
	);
	$sinag_search_form_atts = wp_parse_args( $args, $default_args );
	get_search_form();
}

/**
 * Arrow Down Menu adds arrow-down-mobile
*/
class Arrow_Walker_Nav_Menu extends Walker_Nav_Menu {
    function start_lvl(&$output, $depth = 0, $args = []) {
      $indent = str_repeat("\t", $depth);
    //   if($depth ==0) {
    //     $output .='<span class="arrow-down-icon"><i class="material-icons">keyboard_arrow_down</i></span>';
    //   }
      $output .= "\n$indent<ul class=\"sub-menu\">\n";
    }
}

/**
 * Add Aria Labels to Menu Items with Children
 */
function sinag_menu_add_aria( $atts, $item, $args, $depth ) {
	if($depth == 0) {
		$has_children = ( is_array( $item->classes ) && in_array( 'menu-item-has-children', $item->classes ) );
		if ( $has_children ) {
			$atts[ 'aria-label' ] = strip_tags( $item->title ) . ' Menu';
			$atts[ 'aria-expanded' ] = 'false';
		}
	}
	return $atts;
}
add_filter( 'nav_menu_link_attributes', 'sinag_menu_add_aria', 10, 4 );

/**
 * Add Images to Menu Item Output
 */
// function sinag_dropdown_mega_images( $item_output, $item, $depth, $args ) {
// 	$image = get_field( 'image', $item );
// 	if( 'primary' !== $args->theme_location ||
// 		empty( $image ) ) {
// 		return $item_output;
// 	}

// 	// You can limit it to certain menus with this check
// 	$image = get_field('image', $item);
// 	$image_alt = get_post_meta($image['id'], '_wp_attachment_image_alt', TRUE);
// 	$alt_text = ($image_alt) ? $image_alt : $item->title;
// 	$img_src = wp_get_attachment_image_src($image['id'], 'menu_image')[0];
// 	$img_html = '<figure><img src="' . $img_src . '" alt="'.$alt_text.'" />' . $args->link_after . '</figure>';
// 	$item_output = $item_output . $img_html;
// 	return $item_output;
// }
// add_filter( 'walker_nav_menu_start_el', 'sinag_dropdown_mega_images', 10, 4 );

/**
 * Takes a PHP Array and returns a json encoded config object
 *
 * @since 0.7.0
 *
 * @param  array  $config Multidimensional array of options.
 * @return string         Returns a json_encoded representation of the array
 */
function sinag_array_to_json( $config ) {
	return htmlspecialchars(json_encode( $config, JSON_FORCE_OBJECT | JSON_NUMERIC_CHECK ));
}


/**
 * Google Maps API Key
 */

// Add a menu item in the WordPress dashboard
function my_custom_menu_page() {
    add_menu_page(
        'Google Maps API Settings',
        'Google Maps API',
        'manage_options',
        'google-maps-api-settings',
        'my_custom_menu_page_callback'
    );
}
add_action('admin_menu', 'my_custom_menu_page');

// Callback function for the menu page
function my_custom_menu_page_callback() {
    ?>
    <div class="wrap">
        <h2>Google Maps API Settings</h2>
        <?php settings_errors('google_maps_api_settings'); // Display any settings errors ?>
        <form method="post" action="options.php">
            <?php
            settings_fields('google_maps_api_settings');
            do_settings_sections('google_maps_api_settings');
            submit_button('Save API Key');
            ?>
        </form>
        <?php
        // Display a notice upon successful API key save
        $screen = get_current_screen();
        $errors = get_settings_errors('google_maps_api_settings');

        if ($screen->id === 'toplevel_page_google-maps-api-settings' && isset($_GET['settings-updated']) && $_GET['settings-updated'] && empty($errors)) {
            ?>
            <div class="updated">
                <p>Google Maps API Key has been saved successfully.</p>
            </div>
            <?php
        }
        ?>
    </div>
    <?php
}

// Register the setting
function my_custom_settings_init() {
    register_setting(
        'google_maps_api_settings',
        'google_maps_api_key',
        'my_custom_sanitize_api_key' // Add a custom sanitizer
    );

    add_settings_section(
        'google_maps_api_section',
        'API Key Settings',
        'my_custom_section_callback',
        'google_maps_api_settings'
    );

    add_settings_field(
        'google_maps_api_key',
        'Google Maps API Key',
        'my_custom_api_key_callback',
        'google_maps_api_settings',
        'google_maps_api_section'
    );
}
add_action('admin_init', 'my_custom_settings_init');

// Section callback
function my_custom_section_callback() {
    echo 'Enter your Google Maps API key below:';
}

// API Key callback
function my_custom_api_key_callback() {
    $api_key = get_option('google_maps_api_key');
    ?>
    <input type="text" name="google_maps_api_key" value="<?php echo esc_attr($api_key); ?>" />
    <?php
}

// Custom sanitizer for the API key
function my_custom_sanitize_api_key($input) {
    if (empty($input)) {
        add_settings_error(
            'google_maps_api_settings',
            'empty_api_key',
            'Please enter a valid Google Maps API Key.',
            'error'
        );
    } else {
        return sanitize_text_field($input);
    }
}
