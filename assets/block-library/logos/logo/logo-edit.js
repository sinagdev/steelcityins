/**
 * Logo editor interface
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
const LogoEdit = ({
	className,
}) => {

	return (
		<div
			{...useBlockProps({
				className: classnames('swiper-slide', className),
			})}
		>
			<InnerBlocks allowedBlocks={false} template={[['core/image']]} />
		</div>
	);
};
export default LogoEdit;
