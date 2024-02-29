/**
 * Counters block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress block.
 */

/**
 * Import dependencies
 */
import edit from './counters-edit';
import save from './counters-save';
import block from './block.json';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
registerBlockType(block.name, {
	title: __('Counters', 'sinag'),
	description: __('The Counters block.', 'sinag'),
	icon: block.icon,
	edit,
	save,
});
