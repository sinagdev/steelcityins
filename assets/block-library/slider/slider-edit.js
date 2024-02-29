/**
 * Slider editor interface
 *
 * This defines how the block works
 * within the back-end block editor.
 */

/**
 * Import dependencies
 */
import classnames from "classnames";
import { arrowUp, arrowDown, more } from "@wordpress/icons";

const { useEffect } = wp.element;
const { useBlockProps, InnerBlocks, InspectorControls } = wp.blockEditor;
const { PanelBody, PanelRow, RangeControl, ToggleControl } = wp.components;

var blockIds = new Set();

/**
 * Generate block editor component
 */
const SliderBlockEdit = ({
  attributes,
  setAttributes,
  clientId,
  className,
}) => {
  const {
    blockId,
    slidesPerView,
    slideSpeed,
    isSlideLoop,
    addNavigation,
    addPagination,
  } = attributes;

  // Function to generate or reset the block ID
  const generateBlockId = () => {
    const newBlockId = blockId || `swiper-${clientId}`;
    setAttributes({ blockId: newBlockId });
    return newBlockId;
  };

  // Use useEffect to manage blockIds
  useEffect(() => {
    // Every time when rerender happens, reset the blockIds
    const swiperId = generateBlockId(); // Get the generated block ID
    if (!blockId || blockIds.has(blockId)) {
      setAttributes({ blockId: swiperId });
      blockIds.add(swiperId);
    } else {
      blockIds.add(blockId);
    }
  }, [blockId]);

  const onSlidesPerView = (slidesPerViewValue) => {
    setAttributes({
      slidesPerView: slidesPerViewValue,
    });
  };

  const onSlideSpeed = (slideSpeedValue) => {
    setAttributes({
      slideSpeed: slideSpeedValue,
    });
  };

  const onIsSlideLoop = (isSlideLoopValue) => {
    setAttributes({
      isSlideLoop: isSlideLoopValue,
    });
  };

  return (
    <>
      <div
        {...useBlockProps({
          className: classnames("slider", className),
        })}
      >
        <InspectorControls>
          <PanelBody title="Swiper Settings" initialOpen={true}>
            <PanelRow>
              <RangeControl
                label="Slides per View"
                help="Choose the Number of Slides to display on the page."
                beforeIcon={arrowDown}
                afterIcon={arrowUp}
                step={0.5}
                withInputField={true}
                icon={more}
                separatorType="topFullWidth"
                marks={[
                  {
                    value: 1,
                    label: "1",
                  },
                  {
                    value: 2,
                    label: "2",
                  },
                  {
                    value: 3,
                    label: "3",
                  },
                  {
                    value: 4,
                    label: "4",
                  },
                  {
                    value: 5,
                    label: "5",
                  },
                  {
                    value: 6,
                    label: "6",
                  },
                ]}
                renderTooltipContent={() => slidesPerView}
                value={slidesPerView}
                onChange={onSlidesPerView}
                min={1}
                max={6}
              />
            </PanelRow>
            <PanelRow>
              <RangeControl
                label="Slide Speed"
                help="Choose the speed of Slide Autoplay."
                beforeIcon={arrowDown}
                afterIcon={arrowUp}
                step={1}
                withInputField={true}
                icon={more}
                separatorType="topFullWidth"
                renderTooltipContent={() => slideSpeed}
                value={slideSpeed}
                onChange={onSlideSpeed}
                min={1}
                max={10}
              />
            </PanelRow>
            <PanelRow>
              <ToggleControl
                label="Slider Loop?"
                help={isSlideLoop ? "Enabled" : "Disabled"}
                checked={isSlideLoop}
                onChange={onIsSlideLoop}
              />
            </PanelRow>
            <PanelRow>
              <ToggleControl
                label="Navigation"
                help={
                  addNavigation === true
                    ? "Show Swiper Navigation."
                    : "Hide Swiper Navigation."
                }
                checked={addNavigation}
                onChange={(addNavigationValue) => {
                  setAttributes({
                    addNavigation: addNavigationValue,
                  });
                }}
              />
            </PanelRow>
            <PanelRow>
              <ToggleControl
                label="Pagination"
                help={
                  addPagination === true
                    ? "Show Swiper Pagination."
                    : "Hide Swiper Pagination."
                }
                checked={addPagination}
                onChange={(addPaginationValue) => {
                  setAttributes({
                    addPagination: addPaginationValue,
                  });
                }}
              />
            </PanelRow>
          </PanelBody>
        </InspectorControls>
        <InnerBlocks
          template={[["sinag/slider-item"]]}
          allowedBlocks={["sinag/slider-item"]}
          attributes={{ ...attributes, blockId: blockId }}
        />
      </div>
    </>
  );
};
export default SliderBlockEdit;
