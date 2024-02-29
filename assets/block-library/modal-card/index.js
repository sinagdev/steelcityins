/**
 * Modal Card block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress block.
 */

/**
 * Register inner blocks
 */
import './modal-card-item';

/**
 * Import dependencies
 */
import Icon from './icon.inline.svg';
import edit from './modal-card-edit';
import save from './modal-card-save';
import block from './block.json';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
registerBlockType(block.name, {
	title: __('Modal Card', 'sinag'),
	description: __('The Modal Card block consists of a Modal Card as a trigger and Modal Card Item as a popup content.', 'sinag'),
	icon: Icon,
	edit,
	save,
});
