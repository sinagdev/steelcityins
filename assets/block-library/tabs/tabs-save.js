/**
 * Tabs save interface
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

const { useBlockProps, InnerBlocks } = wp.blockEditor;
const { RawHTML } = wp.element;

/**
 * Generate block HTML to save to the database
 */
const TabsBlockSave = ({ attributes, className }) => {
  const { tabLabelsArray, sideTabLayout } = attributes;

  const blockProps = useBlockProps.save({
    className: classnames('tabs-container', {
      'side-tab-layout': sideTabLayout,
    }),
  });

  return (
    <div {...blockProps}>
      <ul className="tab-labels" role="tablist" aria-label="tabbed content">
        {tabLabelsArray.map((label, i) => (
          <li
            className={i === 0 ? 'tab-label active' : 'tab-label'}
            role="tab"
            aria-selected={i === 0 ? 'true' : 'false'}
            aria-controls={label}
            tabIndex="0"
            key={i}
          >
            {label}
          </li>
        ))}
      </ul>
      <div className="tab-content">
        <InnerBlocks.Content />
      </div>
    </div>
  );
};

export default TabsBlockSave;
