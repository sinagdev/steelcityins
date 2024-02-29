/**
 * Slider Item block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress child block.
 */

/**
 * Import dependencies
 */
import Icon from './icon.inline.svg';
import edit from './slider-item-edit';
import save from './slider-item-save';
import block from './block.json';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
registerBlockType(block.name, {
	title: __('Slider Item', 'sinag'),
	description: __(block.description, 'sinag'),
	icon: Icon,
	edit,
	save,
	parent: ['sinag/slider'],
});
