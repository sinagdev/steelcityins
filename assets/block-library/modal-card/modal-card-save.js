/**
 * Modal Card save interface
 *
 * This defines how the block gets
 * saved into the database. If
 * it returns null or <InnerBlocks.Content />
 * then is a dynamic block.
 */

/**
 * Import save dependencies
 */
import classnames from 'classnames';

const { useBlockProps, useInnerBlocksProps } = wp.blockEditor;

/**
 * Generate block HTML to save to the database
 */

const ModalCardBlockSave = ({ attributes, className }) => {
  const { blockId, modalCardTarget } = attributes;

  const blockProps = useBlockProps.save({ className: classnames("modal-card-container", className) });

  const innerBlocksProps = useInnerBlocksProps.save({ ...blockProps }, { template: [["sinag/modal-card-item"]] });

  return <div {...innerBlocksProps} modal-target={modalCardTarget} id={blockId} data-aos="fade" data-aos-easing="ease-in-out"
  data-aos-mirror="false" data-aos-duration="1000"/>;
};

export default ModalCardBlockSave;

