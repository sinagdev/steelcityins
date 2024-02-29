/**
 * Blurbs block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress block.
 */

/**
 * Register inner blocks
 */
import './blurb';

/**
 * Import dependencies
 */
import edit from './blurbs-edit';
import save from './blurbs-save';
import block from './block.json';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
registerBlockType(block.name, {
	title: __('Blurbs', 'sinag'),
	description: __('A set of Blurb items that combines both imagery and text to showcase certain features, you can use it to add a list of your company’s services on your homepage. The Blurb Module also allows you to turn your Blurb image/icon and title into a link to your service page.', 'sinag'),
	icon: block.icon,
	edit,
	save,
});
