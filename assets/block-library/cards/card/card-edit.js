/**
 * Card editor interface
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
const CardEdit = ({
	className,
}) => {
	const ALLOWED_BLOCKS = [
		'core/heading',
		'core/image',
		'core/paragraph',
		'core/buttons',
		'core/navigation',
		'core/social-links',
	];

	const TEMPLATE = [
		['core/image',{
			className: 'card-image'
		}],
		[
			'core/heading',
			{
				level: 5,
				placeholder: 'Card Title',
				className: 'card-title'
			},
		],
		[
			'core/paragraph',
			{
				placeholder: 'Card content here...',
				className: 'card-body'
			},
		],
		['core/buttons'],
	];

	return (
		<div
			{...useBlockProps({
				className: classnames('card', className),
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
export default withNotices(CardEdit);
