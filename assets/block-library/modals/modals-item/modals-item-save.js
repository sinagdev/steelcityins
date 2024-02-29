/**
 * Modals Item save interface
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
const ModalsItemSave = () => {
  return (
    <div class="modal">
      <div class="modal-header right-align">
        <i class="material-icons modal-close">close</i>
      </div>
      <div class="modal-content">
        <InnerBlocks.Content />
      </div>
    </div>
  );
};

export default ModalsItemSave;
