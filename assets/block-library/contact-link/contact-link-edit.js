/**
 * Contact Link editor interface
 *
 * This defines how the block works
 * within the back-end block editor.
 */

/**
 * Import edit dependencies
 */
import classnames from "classnames";

const { useBlockProps, InspectorControls } = wp.blockEditor;
const {
  PanelBody,
  PanelRow,
  TextControl,
  ToggleControl,
  __experimentalInputControl,
} = wp.components;

/**
 * Generate block editor component
 */
const ContactLinkBlockEdit = ({ attributes, setAttributes, className }) => {
  const { linkUrl, linkText, linkIcon, linkInNewTab } = attributes;
  return (
    <div
      {...useBlockProps({
        className: classnames("contact-link__item", className),
      })}
    >
      <InspectorControls>
        <PanelBody title="Contact Link Settings" initialOpen={true}>
          <PanelRow>
            <__experimentalInputControl
              label="Contact Link Icon"
              labelPosition="top"
              value={linkIcon}
              isPressEnterToChange
              prefix="fa-"
              onChange={(linkIconValue) => {
                setAttributes({
                  linkIcon: linkIconValue,
                });
              }}
            />
          </PanelRow>
          <PanelRow>
            <TextControl
              label="Contact Link URL"
              labelPosition="top"
              value={linkUrl}
              onChange={(linkUrlValue) => {
                setAttributes({
                  linkUrl: linkUrlValue,
                });
              }}
            />
          </PanelRow>
          <PanelRow>
            <TextControl
              label="Contact Link text"
              labelPosition="top"
              value={linkText}
              onChange={(linkTextValue) => {
                setAttributes({
                  linkText: linkTextValue,
                });
              }}
            />
          </PanelRow>
          <PanelRow>
            <ToggleControl
              label="Open link in a new tab?"
              help={linkInNewTab ? true : false}
              checked={linkInNewTab}
              onChange={(linkInNewTabValue) => {
                setAttributes({
                  linkInNewTab: linkInNewTabValue,
                });
              }}
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>

      <a
        href={linkUrl}
        onClick={(e) => e.preventDefault()}
        className="contact-link-url"
        target={linkInNewTab ? "_blank" : "_self"}
        rel={linkInNewTab ? "noopener noreferrer" : "noopener"}
      >
        <span className="contact-link-icon">
          <i className={`fa-solid fa-${linkIcon}`}></i>
        </span>
        <span className="contact-link-text">{linkText}</span>
      </a>
    </div>
  );
};
export default ContactLinkBlockEdit;
