/**
 * template-title editor interface
 *
 * This defines how the block works
 * within the back-end block editor.
 */

/**
 * Import edit dependencies
 */
import classnames from 'classnames';

const { __ } = wp.i18n;
const { useBlockProps, InnerBlocks, RichText } = wp.blockEditor;

/**
 * Generate block editor component
 */
const TemplateNamespaceBlockEdit = ({
	attributes,
	setAttributes,
	className,
}) => {
	const { demoText } = attributes;

	return (
		<div
			{...useBlockProps({
				className: classnames('template-slug', className),
			})}
		>
			{/* replace this demo code with your own: */}
			<RichText
				tagName="b"
				placeholder={__('template-title', 'sinag')}
				value={demoText}
				onChange={(value) => setAttributes({ demoText: value })}
			/>
			<InnerBlocks /* PLACEHOLDER: inner blocks template */ />
		</div>
	);
};
export default TemplateNamespaceBlockEdit;
