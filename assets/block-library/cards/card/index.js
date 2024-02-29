/**
 * Card block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress child block.
 */

/**
 * Import dependencies
 */
import edit from './card-edit';
import save from './card-save';
import block from './block.json';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
registerBlockType(block.name, {
	title: __('Card', 'sinag'),
	description: __('Card consists of interactive elements such as text, links, buttons or images but they suggest just one main action.', 'sinag'),
	icon: block.icon,
	parent: block.parent,
	edit,
	save,
});
