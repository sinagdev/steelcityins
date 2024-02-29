/**
 * Accordion Item editor interface
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
const AccordionItemEdit = ({ className }) => {

	const TEMPLATE = [
		[
			'core/heading',
			{
				level: 4,
				placeholder: 'Accordion Heading',
				className: 'accordion__item-heading',
			},
		],
		[
			'core/paragraph',
			{
				placeholder: 'Accordion Content here....',
				className: 'collapsible-body accordion__item-body',
			},
		],
	];

	return (
		<li
			{...useBlockProps({
				className: classnames('accordion__item', className),
			})}
		>
			<InnerBlocks allowedBlocks={false} template={TEMPLATE} />
		</li>
	);
};
export default AccordionItemEdit;
