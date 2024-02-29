/**
 * Modal Card editor interface
 *
 * This defines how the block works
 * within the back-end block editor.
 */

/**
 * Import edit dependencies
 */

import classnames from 'classnames';
const { useBlockProps, useInnerBlocksProps } = wp.blockEditor;
const { useEffect } = wp.element;

const ModalCardBlockEdit = ({ attributes, setAttributes, clientId, className }) => {
  const { blockId, modalCardTarget } = attributes;

  useEffect(() => {
    if (!blockId) setAttributes({ blockId: `modal-card-${clientId}` });
    if (!modalCardTarget) setAttributes({ modalCardTarget: clientId });
  }, [blockId, modalCardTarget, clientId]);

  const blockProps = useBlockProps({ className: classnames("modal-card-container", className) });

  const template = [
    ["sinag/card", { className: 'modal-card-trigger' }],
    ["sinag/modal-card-item"]
  ];

  const allowedBlocks = ["sinag/card"];

  const innerBlocksProps = useInnerBlocksProps({ ...blockProps }, { template, allowedBlocks });

  return <div {...innerBlocksProps} modal-target={modalCardTarget} id={blockId} />;
};

export default ModalCardBlockEdit;
