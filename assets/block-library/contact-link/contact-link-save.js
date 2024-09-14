/**
 * Contact Link save interface
 *
 * This defines how the block gets
 * saved into the database. If
 * it returns null or <InnerBlocks.Content />
 * then is a dynamic block.
 */

/**
 * Generate block HTML to save to the database
 */
const ContactLinkBlockSave = ({ attributes }) => {
  const { linkUrl, linkText, linkIcon, linkInNewTab } = attributes;
  return (
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
  );
};
export default ContactLinkBlockSave;
