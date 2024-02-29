/**
 * Modals Trigger editor interface
 *
 * This defines how the child block works
 * within the back-end block editor.
 */

/**
 * Import dependencies
 */
import classnames from "classnames";
const { useBlockProps, InnerBlocks } = wp.blockEditor;
const { withNotices } = wp.components;

/**
 * Generate block editor component
 */
const ModalsTriggerEdit = ({ className }) => {
  const ALLOWED_BLOCKS = [
    "core/heading",
    "core/image",
    "core/paragraph",
    "core/navigation-link",
    "core/social-links",
    "sinag/cards"
  ];

  const TEMPLATE = [
    [
      "core/paragraph",
      {
        placeholder: "Modal Trigger content here...",
      },
    ],
  ];

  return (
    <div
      {...useBlockProps({
        className: classnames("modal-trigger", className),
      })}
    >
      <InnerBlocks
        orientation="horizontal"
        allowedBlocks={ALLOWED_BLOCKS}
        template={TEMPLATE}
      />
    </div>
  );
};
export default withNotices(ModalsTriggerEdit);
