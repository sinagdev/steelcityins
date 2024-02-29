/**
 * Modals Trigger block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress child block.
 */

/**
 * Import dependencies
 */
import Icon from './icon.inline.svg';
import edit from './modals-trigger-edit';
import save from './modals-trigger-save';
import block from './block.json';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
registerBlockType(block.name, {
	title: __('Modals Trigger', 'sinag'),
	description: __('The Modals Trigger nested block.', 'sinag'),
	icon: Icon,
	edit,
	save,
	parent: ['sinag/modals'],
});
