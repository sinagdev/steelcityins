/**
 * Blurb editor interface
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
const BlurbEdit = ({ className }) => {
	const ALLOWED_BLOCKS = [
		'core/heading',
		'core/image',
		'core/paragraph',
		'core/navigation-link',
	];

	const TEMPLATE = [
		[
			'core/image',
			{
				className: 'blurb__icon',
			},
		],
		[
			'core/heading',
			{
				level: 3,
				placeholder: 'Blurb Title',
				className: 'blurb__title',
			},
		],
		[
			'core/paragraph',
			{
				placeholder: 'Blurb Text',
				className: 'blurb__text',
			},
		],
		[
			'core/navigation-link',
			{
				className: 'blurb__link',
			},
		],
	];

	return (
		<div
			{...useBlockProps({
				className: classnames('blurb', className),
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
export default withNotices(BlurbEdit);
