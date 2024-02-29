/**
 * Tabs Item edit interface
 *
 * This defines how the child block works
 * within the back-end block editor.
 */

/**
 * Import dependencies
 */
const { useBlockProps, InnerBlocks } = wp.blockEditor;
const { TextControl } = wp.components;
const { subscribe } = wp.data;

const TabsItemEdit = ({ attributes, setAttributes, className, clientId }) => {
  const { tabLabel, blockIndex } = attributes;
  const parentBlockID = wp.data
    .select("core/block-editor")
    .getBlockParentsByBlockName(clientId, ["sinag/tabs"])[0]; // Use [0] to get the first parent ID.

  const getBlockIndex = wp.data
    .select("core/block-editor")
    .getBlockOrder(parentBlockID)
    .indexOf(clientId);

  const unsubscribe = subscribe(() => {
    const newBlockIndex = wp.data
      .select("core/block-editor")
      .getBlockOrder(parentBlockID)
      .indexOf(clientId);
    const blockIndexChange = newBlockIndex !== blockIndex;

    if (blockIndexChange) {
      // Update attributes when blocks move up or down
      unsubscribe();
      setAttributes({ blockIndex: newBlockIndex });
      wp.data
        .dispatch("core/block-editor")
        .updateBlockAttributes(parentBlockID, { updateChild: true });
    }
  });

  const onChangeTabLabel = (newTabLabel) => {
    setAttributes({ tabLabel: newTabLabel });
    setAttributes({ blockIndex: getBlockIndex });
    wp.data
      .dispatch("core/block-editor")
      .updateBlockAttributes(parentBlockID, { updateChild: true });
  };

  return (
    <div {...useBlockProps({ className })}>
      <h4>Tab Label</h4>
      <TextControl
        className="tab-label_input"
        value={tabLabel}
        onChange={onChangeTabLabel}
        placeholder="Add Tab Label"
        type="text"
      />
      <h4>Tab Content</h4>
      <InnerBlocks />
    </div>
  );
};

export default TabsItemEdit;
