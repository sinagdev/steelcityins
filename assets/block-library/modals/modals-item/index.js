/**
 * Modals Item block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress child block.
 */

/**
 * Import dependencies
 */
import Icon from './icon.inline.svg';
import edit from './modals-item-edit';
import save from './modals-item-save';
import block from './block.json';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
registerBlockType(block.name, {
	title: __('Modals Item', 'sinag'),
	description: __('The Modals Item nested block.', 'sinag'),
	icon: Icon,
	edit,
	save,
	parent: ['sinag/modals'],
});
