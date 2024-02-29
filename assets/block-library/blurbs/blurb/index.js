/**
 * Blurb block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress child block.
 */

/**
 * Import dependencies
 */
import edit from './blurb-edit';
import save from './blurb-save';
import block from './block.json';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
registerBlockType(block.name, {
	title: __('Blurb', 'sinag'),
	description: __('A line or short paragraph (20-50 words) that evaluates (or at least summarizes) what the reader will find at the other end of a link.', 'sinag'),
	icon: block.icon,
	edit,
	save,
	parent: ['sinag/blurbs'],
});
