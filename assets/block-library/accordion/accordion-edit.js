/**
 * Accordion editor interface
 *
 * This defines how the block works
 * within the back-end block editor.
 */

/**
 * Import edit dependencies
 */
import classnames from 'classnames';

const { useBlockProps, InnerBlocks } = wp.blockEditor;
const { useEffect } = wp.element;
/**
 * Generate block editor component
 */
var blockIds = new Set();

const AccordionBlockEdit = ({
	attributes,
	setAttributes,
	clientId,
	className,
}) => {
	const { blockId } = attributes;

		// Check if blockId is not set, and if not, generate a unique ID
		const accordionId = blockId || `accordion-${clientId}`;

		// Update the blockId attribute with the generated ID
		setAttributes({ blockId: accordionId });
	
		// Use useEffect to manage blockIds
		useEffect(() => {
			// Every time when rerender happens, reset the blockIds
	
			if (!blockId || blockIds.has(blockId)) {
				setAttributes({ blockId: accordionId });
				blockIds.add(accordionId);
			} else {
				blockIds.add(blockId);
			}
		}, [blockId]);
	

	return (
		<div
			{...useBlockProps({
				className: classnames('accordion', className),
			})}
		>
			<ul className="collapsible" id={blockId}>
				<InnerBlocks
					template={[['sinag/accordion-item']]}
					allowedBlocks={['sinag/accordion-item']}
				/>
			</ul>
		</div>
	);
};
export default AccordionBlockEdit;
