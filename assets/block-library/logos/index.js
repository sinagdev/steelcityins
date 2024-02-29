/**
 * Logos block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress block.
 */

/**
 * Register inner blocks
 */
import './logo';

/**
 * Import dependencies
 */
import edit from './logos-edit';
import save from './logos-save';
import block from './block.json';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
registerBlockType(block.name, {
	title: __('Logos', 'sinag'),
	description:  __(block.description, 'sinag'),
	icon: block.icon,
	category: block.category,
	edit,
	save,
});
