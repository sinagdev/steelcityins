/**
 * Tabs Item save interface
 *
 * This defines how the block gets
 * saved into the database. If
 * it returns null or <InnerBlocks.Content />
 * then is a dynamic block.
 */

/**
 * Import dependencies
 */
import classnames from "classnames";
const { useBlockProps, InnerBlocks } = wp.blockEditor;

const TabsItemSave = ({ className }) => {
  return (
    <div {...useBlockProps.save({ className: 'tab-panel', classnames })} role="tabpanel" tabIndex="0">
      <InnerBlocks.Content />
    </div>
  );
};

export default TabsItemSave;

