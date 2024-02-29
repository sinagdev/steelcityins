/**
 * Tabs editor interface
 *
 * This defines how the block works
 * within the back-end block editor.
 */

/**
 * Import edit dependencies
 */
import classnames from "classnames";

const { __ } = wp.i18n;
const { useBlockProps, InnerBlocks } = wp.blockEditor;
const { ToggleControl } = wp.components;
const { useSelect } = wp.data;

const TabsBlockEdit = ({ attributes, setAttributes, clientId, className }) => {
  const { tabLabelsArray, updateChild, sideTabLayout } = attributes;

  const buildTabLabelsArray = () => {
    const innerBlockCount = useSelect((select) =>
      select("core/block-editor").getBlockCount(clientId)
    );
  
    const tabLabels = [];
  
    for (let block = 0; block < innerBlockCount; block++) {
      const blocks = wp.data.select("core/block-editor").getBlocks(clientId);
      if (blocks[block] && blocks[block].attributes) {
        const tabLabel = blocks[block].attributes.tabLabel;
        if (tabLabel) {
          tabLabels.push(tabLabel);
        }
      }
    }
  
    return tabLabels;
  };  

	var labelsArray = buildTabLabelsArray();
	var labelLengthChange = labelsArray.length !== tabLabelsArray.length;
	
	if( labelLengthChange || updateChild ){
		setAttributes ({ tabLabelsArray: labelsArray  });
		setAttributes ({ updateChild: false });
	}

	const onChangeTabLabel = toggle => {
		setAttributes({ sideTabLayout: toggle });
	};

  return (
    <div
      {...useBlockProps({
        className: classnames("tabs-container", className),
      })}
    >
      <h2>{__("Tabbed Layout Block", "textdomain")}</h2>
      <ToggleControl
        label={__("Switch to side tab layout", "textdomain")}
        help={
          sideTabLayout
            ? __("Side tab layout selected", "textdomain")
            : __("Default layout", "textdomain")
        }
        checked={sideTabLayout}
        onChange={onChangeTabLabel}
      />
      <InnerBlocks
        template={[["sinag/tabs-item"]]}
        allowedBlocks={["sinag/tabs-item"]}
        renderAppender={InnerBlocks.ButtonBlockAppender}
      />
    </div>
  );
};

export default TabsBlockEdit;
