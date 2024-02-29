/**
 * Tabs Item block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress child block.
 */

/**
 * Import dependencies
 */
import Icon from './icon.inline.svg';
import edit from './tabs-item-edit';
import save from './tabs-item-save';
import block from './block.json';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
registerBlockType(block.name, {
	title: __('Tabs Item', 'sinag'),
	description: __('The Tabs Item nested block.', 'sinag'),
	icon: Icon,
	edit,
	save,
	parent: ['sinag/tabs'],
});
