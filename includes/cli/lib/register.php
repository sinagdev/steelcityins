<?php
/**
 * WP-CLI setup, hooks, and filters, etc.
 * 
 * @package SinagCLI
 */

namespace SinagCLI\Register;

use WP_CLI;

defined( 'ABSPATH' ) || exit; // exit if accessed directly

/**
 * Run WordPress hooks for WP-CLI setup.
 *
 * @return void
 */
function init() {
	add_action( 'cli_init', 'SinagCLI\Register\register_commands' );
}

/**
 * Register new WP-CLI commands.
 * 
 * @return void
 */
function register_commands() {
	WP_CLI::add_command( 'sinag setup', '\SinagCLI\Setup\setup' );
	WP_CLI::add_command( 'sinag block create', '\SinagCLI\Block\block_create' );
	WP_CLI::add_command( 'sinag component create', '\SinagCLI\Component\component_create' );
}
