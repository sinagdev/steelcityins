/**
 * Accordion Item save interface
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
const AccordionItemSave = ({  className }) => {

	return (
		<li
			{...useBlockProps.save({
				className: classnames('accordion__item', className),
			})}
		>
			<InnerBlocks.Content />
		</li>
	);
};

export default AccordionItemSave;