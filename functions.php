<?php
/**
 * Sinag functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Sinag
 */

/**
 * Set up constants
 */
define( 'SINAG_TEMPLATE_URL', get_template_directory_uri() );
define( 'SINAG_PATH', get_template_directory() );
define( 'SINAG_INC', SINAG_PATH . '/includes' );
define( 'SINAG_ASSETS', SINAG_PATH . '/assets' );

/**
 * Set up the theme.
 */
require SINAG_INC . '/core.php';

/**
 * Add common reusable scripts
 */
require SINAG_INC . '/util.php';

/**
 * Add enqueue scripts
 */
require SINAG_INC . '/enqueue.php';

/**
 * Add the custom blocks
 */
require SINAG_INC . '/blocks.php';

/**
 * Enable command line interface
 */
require SINAG_INC . '/cli/wp-cli.php';
