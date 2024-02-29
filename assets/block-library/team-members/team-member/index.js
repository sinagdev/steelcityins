/**
 * Team Member block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress child block.
 */

/**
 * Import dependencies
 */
import edit from './team-member-edit';
import save from './team-member-save';
import block from './block.json';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
registerBlockType(block.name, {
	title: __('Team Member', 'sinag'),
	description: __('The Team Member nested block.', 'sinag'),
	icon: block.icon,
	parent: block.parent,
	edit,
	save,
	parent: ['sinag/team-members'],
});
