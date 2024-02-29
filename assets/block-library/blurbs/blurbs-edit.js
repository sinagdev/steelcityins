/**
 * Blurbs editor interface
 *
 * This defines how the block works
 * within the back-end block editor.
 */

/**
 * Import edit dependencies
 */
import classnames from 'classnames';

const { __ } = wp.i18n;
const { useBlockProps, InnerBlocks, InspectorControls } = wp.blockEditor;
const { PanelBody, RangeControl } = wp.components;

/**
 * Generate block editor component
 */
const BlurbsBlockEdit = ({ attributes, setAttributes, className }) => {
	const { columns } = attributes;
	const initialRangeValue = 3;

	const onChangeColumns = (newColumns) => {
		setAttributes({ columns: newColumns });
	};

	return (
		<div
			{...useBlockProps({
				className: classnames(
					[`has-${columns ?? initialRangeValue}-columns`],
					className
				),
			})}
		>
			<InspectorControls>
				<PanelBody>
					<RangeControl
						label={__('Columns', 'sinag')}
						min={1}
						max={6}
						initialPosition={initialRangeValue}
						onChange={onChangeColumns}
						value={columns}
					/>
				</PanelBody>
			</InspectorControls>
			<InnerBlocks
				template={[['sinag/blurb']]}
				orientation="horizontal"
				allowedBlocks={['sinag/blurb']}
			/>
		</div>
	);
};
export default BlurbsBlockEdit;