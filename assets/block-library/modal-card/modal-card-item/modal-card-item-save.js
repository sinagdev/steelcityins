/**
 * Modal Card Item save interface
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
const ModalCardItemSave = () => {
  return (
    <div class="modal-card-overlay">
      <div class="modal-card-popup">
        <div class="modal-card-header right-align">
          <i class="material-icons modal-card-close">close</i>
        </div>
        <div class="modal-card-content">
          <InnerBlocks.Content />
        </div>
      </div>
    </div>
  );
};

export default ModalCardItemSave;
