/**
 * Team Member save interface
 *
 * This defines how the block gets
 * saved into the database. If
 * it returns null or <InnerBlocks.Content />
 * then is a dynamic block.
 */

/**
 * Import dependencies
 */
import classnames from 'classnames';

const { useBlockProps, InnerBlocks } = wp.blockEditor;

/**
 * Generate block HTML to save to the database
 */
const TeamMemberSave = ({ className }) => {
	return (
		<div
			{...useBlockProps.save({
				className: classnames('team-member', className),
			})}
		>
			<InnerBlocks.Content />
		</div>
	);
};

export default TeamMemberSave;
