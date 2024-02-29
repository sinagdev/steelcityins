/**
 * Blog Feed editor interface
 *
 * This defines how the block works
 * within the back-end block editor.
 */

/**
 * Import edit dependencies
 */
import classnames from "classnames";
import { arrowUp, arrowDown, more } from "@wordpress/icons";

const ServerSideRender = wp.serverSideRender;
const { useSelect } = wp.data;
const { useEffect } = wp.element;
const { useBlockProps, InspectorControls } = wp.blockEditor;
const { PanelBody, QueryControls, PanelRow, RangeControl, ToggleControl } =
  wp.components;

var blockIds = new Set();

/**
 * Generate block editor component
 */
const BlogFeedBlockEdit = ({
  attributes,
  setAttributes,
  clientId,
  className,
}) => {
  const {
    blockId,
    numberOfPosts,
    order,
    orderBy,
    categories,
    slidesPerView,
    addNavigation,
    addPagination,
  } = attributes;

  // Function to generate or reset the block ID
  const generateBlockId = () => {
    const newBlockId = blockId || `blog-swiper-${clientId}`;
    setAttributes({ blockId: newBlockId });
    return newBlockId;
  };

  // Use useEffect to manage blockIds
  useEffect(() => {
    // Every time when rerender happens, reset the blockIds
    const blogSwiperId = generateBlockId(); // Get the generated block ID
    if (!blockId || blockIds.has(blockId)) {
      setAttributes({ blockId: blogSwiperId });
      blockIds.add(blogSwiperId);
    } else {
      blockIds.add(blockId);
    }
  }, [blockId]);

  useEffect(() => {
    // Initialize Swiper directly within useEffect
    const blogSwiperId = generateBlockId(); // Get the generated block ID
    // Make sure Swiper is available before initializing
    if (typeof Swiper !== "undefined") {
      window.onload = function () {
        new Swiper(`#${blogSwiperId}`, {
          slidesPerView: slidesPerView,
          spaceBetween: 30,
          setWrapperSize: true,
          watchOverflow: true,
          pagination: {
            el: `#${blogSwiperId} .swiper-pagination`,
            clickable: true,
          },
          navigation: {
            nextEl: `#${blogSwiperId} .swiper-button-next`,
            prevEl: `#${blogSwiperId} .swiper-button-prev`,
          },
        });
      };
    }
  }, [attributes]);

  const allCategories = useSelect((select) => {
    return select("core").getEntityRecords("taxonomy", "category", {
      per_page: -1,
    });
  }, []);

  const categorySuggestions = {};

  if (allCategories) {
    for (let i = 0; i < allCategories.length; i++) {
      const category = allCategories[i];
      categorySuggestions[category.name] = category;
    }
  }

  const onCategoryChange = (values) => {
    const hasNoSuggestions = values.some(
      (value) => typeof value === "string" && !categorySuggestions[value]
    );

    if (hasNoSuggestions) return;

    const updatedCategories = values.map((token) => {
      return typeof token === "string" ? categorySuggestions[token] : token;
    });

    setAttributes({
      categories: updatedCategories,
    });
  };

  const onNumberOfItemsChange = (value) => {
    setAttributes({
      numberOfPosts: value,
    });
  };

  const onSlidesPerView = (slidesPerViewValue) => {
    setAttributes({
      slidesPerView: slidesPerViewValue,
    });
  };

  return (
    <div
      {...useBlockProps({
        className: classnames("blog-feed", className),
      })}
    >
      <InspectorControls>
        <PanelBody>
          <QueryControls
            numberOfItems={numberOfPosts}
            onNumberOfItemsChange={onNumberOfItemsChange}
            minItems={1}
            maxItems={12}
            orderBy={orderBy}
            onOrderByChange={(orderByValue) =>
              setAttributes({ orderBy: orderByValue })
            }
            order={order}
            onOrderChange={(orderValue) => setAttributes({ order: orderValue })}
            categorySuggestions={categorySuggestions}
            selectedCategories={categories}
            onCategoryChange={onCategoryChange}
          />
        </PanelBody>
        <PanelBody
          title="Swiper Settings"
          initialOpen={true}
        >
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
      <ServerSideRender
        block="sinag/blog-feed"
        attributes={{ ...attributes, blockId: blockId }}
      />
    </div>
  );
};
export default BlogFeedBlockEdit;
