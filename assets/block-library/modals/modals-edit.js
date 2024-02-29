/**
 * Modals editor interface
 *
 * This defines how the block works
 * within the back-end block editor.
 */

/**
 * Import edit dependencies
 */
import classnames from "classnames";

const { useBlockProps, useInnerBlocksProps } = wp.blockEditor;
const { useEffect } = wp.element;

/**
 * Generate block editor component
 */

const ModalsBlockEdit = ({
  attributes,
  setAttributes,
  clientId,
  className,
}) => {
  const { blockId, modalTarget, variation } = attributes;

  // Use useEffect to manage blockId and modalTarget
  useEffect(() => {
    if (!blockId) {
      setAttributes({ blockId: `modal-${clientId}` });
    }

    if (!modalTarget) {
      setAttributes({ modalTarget: clientId });
    }
  }, [blockId, modalTarget, clientId]);

  const blockProps = useBlockProps({
    className: classnames("modals-container", className),
  });

  const templates = {
    item: {
      template: [["sinag/modals-item"], ["sinag/modals-trigger"]],
      allowedBlocks: ["sinag/modals-item"],
    },
    trigger: {
      template: [["sinag/modals-trigger"], ["sinag/modals-item"]],
      allowedBlocks: ["sinag/modals-trigger"],
    },
  };

  const innerBlocksProps = useInnerBlocksProps(
    { ...blockProps },
    { ...templates[variation] }
  );

  return (
    <div {...innerBlocksProps} modal-target={modalTarget} id={blockId}>
      {innerBlocksProps.children}
    </div>
  );
};

export default ModalsBlockEdit;
