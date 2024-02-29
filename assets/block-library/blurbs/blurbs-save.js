/**
 * Blurbs save interface
 *
 * This defines how the block gets
 * saved into the database. If
 * it returns null or <InnerBlocks.Content />
 * then is a dynamic block.
 */

/**
 * Import dependencies
 */
const { useBlockProps, InnerBlocks } = wp.blockEditor;

/**
 * Generate block HTML to save to the database
 */
const BlurbsBlockSave = ({ attributes}) => {
	const { columns } = attributes;
	const initialRangeValue = 3;

	return (
		<div
			{...useBlockProps.save({
				className: `has-${ columns ?? initialRangeValue}-columns`,
			})}
		>
			<InnerBlocks.Content />
		</div>
	);
};
export default BlurbsBlockSave;
