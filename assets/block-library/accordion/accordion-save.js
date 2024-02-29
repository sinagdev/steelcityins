/**
 * Accordion save interface
 *
 * This defines how the block gets
 * saved into the database. If
 * it returns null or <InnerBlocks.Content />
 * then it is a dynamic block.
 */

/**
 * Import save dependencies
 */

import classnames from 'classnames';

const { useBlockProps, InnerBlocks } = wp.blockEditor; // Import wp.blockEditor components

const AccordionBlockSave = ({ attributes, className }) => {
  const { blockId } = attributes;

  return (
    <div
    {...useBlockProps.save({
      className: classnames('accordion', className),
    })}
  >
    <ul className="collapsible" id={blockId}>
      <InnerBlocks.Content />
    </ul>
  </div>
  );
};

export default AccordionBlockSave;


