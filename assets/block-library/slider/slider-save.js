/**
 * Slider save interface
 *
 * This defines how the block gets
 * saved into the database. If
 * it returns null or <InnerBlocks.Content />
 * then is a dynamic block.
 */

/**
 * Import dependencies
 */

const { InnerBlocks } = wp.blockEditor;

/**
 * Generate block HTML to save to the database
 */
const SliderBlockSave = () => {
	return <InnerBlocks.Content />;
};
export default SliderBlockSave;
