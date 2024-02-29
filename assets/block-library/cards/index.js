/**
 * Cards block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress block.
 */

/**
 * Register inner blocks
 */
import './card';

/**
 * Import dependencies
 */
import edit from './cards-edit';
import save from './cards-save';
import block from './block.json';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
registerBlockType(block.name, {
	title: __('Cards', 'sinag'),
	description:  __(block.description, 'sinag'),
	icon: block.icon,
	category: block.category,
	example: block.example,
	edit,
	save,
});
