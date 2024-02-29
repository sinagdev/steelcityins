/**
 * Grid Item block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress child block.
 */

/**
 * Import variations
 */
import './grd-item-variations';

/**
 * Import dependencies
 */
import Icon from './icon.inline.svg';
import edit from './grd-item-edit';
import save from './grd-item-save';
import block from './block.json';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
registerBlockType(block.name, {
	title: __('Grid Item', 'sinag'),
	description: __('Item within a grid.', 'sinag'),
	icon: Icon,
	edit,
	save,
	parent: ['sinag/grd'],
});
