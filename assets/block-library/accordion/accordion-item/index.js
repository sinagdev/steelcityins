/**
 * Accordion Item block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress child block.
 */

/**
 * Import dependencies
 */
import edit from './accordion-item-edit';
import save from './accordion-item-save';
import block from './block.json';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
registerBlockType(block.name, {
	title: __('Accordion Item', 'sinag'),
	description: __(block.description, 'sinag'),
	icon: block.icon,
	edit,
	save,
	parent: ['sinag/accordion'],
});
