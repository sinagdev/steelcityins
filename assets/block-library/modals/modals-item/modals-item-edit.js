/**
 * Modals Item editor interface
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
const ModalsItemEdit = ({ className }) => {
  const TEMPLATE = [
    [
      "core/heading",
      {
        level: 3,
        placeholder: "Modal Content Heading",
      },
    ],
    [
      "core/paragraph",
      {
        placeholder:
          "Modal content here... Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae exercitationem corrupti incidunt similique consectetur perspiciatis ducimus impedit deserunt necessitatibus sapiente quia dicta, ea dolore facere qui quidem architecto? Cupiditate, in. Quisquam sint, minus nemo tempora pariatur voluptate! Quae maiores voluptatem doloribus veritatis harum natus eius veniam enim obcaecati! Non libero assumenda sed cumque dicta. Nulla molestiae reiciendis perspiciatis ad facilis!",
      },
    ],
  ];

  return (
    <div
      {...useBlockProps({
        className: classnames("modal-item", className),
      })}
    >
      <InnerBlocks orientation="horizontal" template={TEMPLATE} />
    </div>
  );
};
export default withNotices(ModalsItemEdit);
