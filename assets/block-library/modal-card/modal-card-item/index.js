/**
 * Modal Card Item block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress child block.
 */

/**
 * Import dependencies
 */
import Icon from './icon.inline.svg';
import edit from './modal-card-item-edit';
import save from './modal-card-item-save';
import block from './block.json';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
registerBlockType(block.name, {
	title: __('Modal Card Item', 'sinag'),
	description: __('The Modal Card Item nested block, which includes Modal/Popup content.', 'sinag'),
	icon: Icon,
	edit,
	save,
	parent: ['sinag/modal-card'],
});
