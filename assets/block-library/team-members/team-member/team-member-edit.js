/**
 * Team Member editor interface
 *
 * This defines how the child block works
 * within the back-end block editor.
 */

/**
 * Import dependencies
 */
import classnames from 'classnames';
const { useBlockProps, InnerBlocks } = wp.blockEditor;
const { withNotices } = wp.components;

/**
 * Generate block editor component
 */
const TeamMemberEdit = ({ className }) => {
	const ALLOWED_BLOCKS = [
		'core/heading',
		'core/image',
		'core/paragraph',
		'core/social-links',
	];

	const TEMPLATE = [
		['core/image'],
		[
			'core/heading',
			{
				level: 3,
				placeholder: 'Team Member name',
			},
		],
		[
			'core/paragraph',
			{
				placeholder: 'Team Member bio',
			},
		],
		['core/social-links'],
	];

	return (
		<div
			{...useBlockProps({
				className: classnames('team-member', className),
			})}
		>
			<InnerBlocks
				orientation="horizontal"
				allowedBlocks={ALLOWED_BLOCKS}
				template={TEMPLATE}
			/>
		</div>
	);
};
export default withNotices(TeamMemberEdit);
