/**
 * Logo block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress child block.
 */

/**
 * Import dependencies
 */
import edit from './logo-edit';
import save from './logo-save';
import block from './block.json';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
registerBlockType(block.name, {
	title: __('Logo', 'sinag'),
	description: __(block.description, 'sinag'),
	icon: block.icon,
	category: block.category,
	edit,
	save,
	parent: ['sinag/logos'],
});
