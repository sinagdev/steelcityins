/**
 * Modal Card Item editor interface
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
const ModalCardItemEdit = ({
	className
}) => {
	const TEMPLATE = [
		[
		  "core/heading",
		  {
			level: 3,
			placeholder: "Modal Content Heading",
		  },
		],
		[
		  "core/paragraph",
		  {
			placeholder:
			  "Modal content here...",
		  },
		],
	  ];
	
	  return (
		<div
		  {...useBlockProps({
			className: classnames("modal-card-item", className),
		  })}
		>
		  <InnerBlocks orientation="horizontal" template={TEMPLATE} />
		</div>
	  );
};
export default withNotices(ModalCardItemEdit);
