/**
 * Blog Feed block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress block.
 */

/**
 * Import dependencies
 */
import Icon from './icon.inline.svg';
import edit from './blog-feed-edit';
import save from './blog-feed-save';
import block from './block.json';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
registerBlockType(block.name, {
	title: __('Blog Feed', 'sinag'),
	description: __(block.description, 'sinag'),
	icon: Icon,
	edit,
	save,
});
