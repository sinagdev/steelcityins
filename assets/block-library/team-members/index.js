/**
 * Team Members block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress block.
 */

/**
 * Register inner blocks
 */
import './team-member';

/**
 * Import dependencies
 */
import edit from './team-members-edit';
import save from './team-members-save';
import block from './block.json';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
registerBlockType(block.name, {
	title: __('Team Members', 'sinag'),
	description: __(block.description, 'sinag'),
	icon: block.icon,
	category: block.category,
	edit,
	save,
});
