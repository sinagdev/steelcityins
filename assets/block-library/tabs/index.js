/**
 * Tabs block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress block.
 */

/**
 * Register inner blocks
 */
import './tabs-item';

/**
 * Import dependencies
 */
import Icon from './icon.inline.svg';
import edit from './tabs-edit';
import save from './tabs-save';
import block from './block.json';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
registerBlockType(block.name, {
	title: __('Tabs', 'sinag'),
	description: __('The Tabs block.', 'sinag'),
	icon: Icon,
	edit,
	save,
});
