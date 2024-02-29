<?php
/*
Plugin Name: Sinag WP-CLI Helpers
Plugin URI: https://www.thinkaquamarine.com
Description: WP-CLI helpers for working with the sinag theme.
Author: @tcmulder
Version: 2.0.0
Author URI: https://www.thinkaquamarine.com
*/

/**
 * Main entry point for sinag's WP-CLI.
 * 
 * @package SinagCLI
 */

namespace SinagCLI;

defined( 'ABSPATH' ) || exit; // exit if accessed directly


/**
 * Define constants.
 */
define( 'SINAG_WP_CLI_LIB', 'lib/' );

/**
 * Include related files.
 */
require_once SINAG_WP_CLI_LIB . 'util.php';
require_once SINAG_WP_CLI_LIB . 'commands/setup.php';
require_once SINAG_WP_CLI_LIB . 'commands/block.php';
require_once SINAG_WP_CLI_LIB . 'commands/component.php';
require_once SINAG_WP_CLI_LIB . 'register.php';

/**
 * Initialize registration of wp-cli commands.
 */
Register\init();
