/**
 * Modals save interface
 *
 * This defines how the block gets
 * saved into the database. If
 * it returns null or <InnerBlocks.Content />
 * then is a dynamic block.
 */

/**
 * Import save dependencies
 */
import classnames from "classnames";

const { useBlockProps, useInnerBlocksProps } = wp.blockEditor;

/**
 * Generate block HTML to save to the database
 */
const ModalsBlockSave = ({ className, attributes }) => {
  const { blockId, modalTarget } = attributes;

  const blockProps = useBlockProps.save({
    className: classnames("modals-container", className),
  });

  const innerBlocksProps = useInnerBlocksProps.save(
    { ...blockProps },
    { template: [["sinag/modals-trigger"]] }
  );

  return (
    <div {...innerBlocksProps} modal-target={modalTarget} id={blockId}>
      {innerBlocksProps.children}
    </div>
  );
};
export default ModalsBlockSave;
