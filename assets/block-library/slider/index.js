/**
 * Slider block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress block.
 */

/**
 * Register inner blocks
 */
import './slider-item';

/**
 * Import dependencies
 */
import edit from './slider-edit';
import save from './slider-save';
import block from './block.json';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
registerBlockType(block.name, {
	title: __('Slider', 'sinag'),
	description: __(block.description, 'sinag'),
	icon: block.icon,
	category: block.category,
	edit,
	save,
});
