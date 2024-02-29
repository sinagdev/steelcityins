/**
 * Slider Item editor interface
 *
 * This defines how the child block works
 * within the back-end block editor.
 */

/**
 * Import dependencies
 */
import classnames from 'classnames';

const { useBlockProps, InnerBlocks } = wp.blockEditor;

/**
 * Generate block editor component
 */
const SliderItemEdit = ({ className }) => {
	const ALLOWED_BLOCKS = [
		'core/image',
		'core/heading',
		'core/paragraph',
		'core/list',
		'core/quote',
		'core/columns',
		'core/social-links',
	];
	const TEMPLATE = [
		['core/columns',{
			updateColumns: 2,
		}],
	];

	return (
		<div
			{...useBlockProps({
				className: classnames('swiper-slide', className),
			})}
		>
			<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE} />
		</div>
	);
};
export default SliderItemEdit;
