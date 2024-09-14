/**
 * Contact Link block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress block.
 */

/**
 * Import dependencies
 */
import Icon from './icon.inline.svg';
import edit from './contact-link-edit';
import save from './contact-link-save';
import block from './block.json';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
registerBlockType(block.name, {
	title: __('Contact Link', 'sinag'),
	description: __('Icon + Link component', 'sinag'),
	icon: Icon,
	edit,
	save,
});
