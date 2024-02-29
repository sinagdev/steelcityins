/**
 * Cards editor interface
 *
 * This defines how the block works
 * within the back-end block editor.
 */

/**
 * Import dependencies
 */
import classnames from 'classnames';

const { useBlockProps, InnerBlocks, InspectorControls } = wp.blockEditor;
const { PanelBody, RangeControl } = wp.components;
const { __ } = wp.i18n;

/**
 * Generate block editor component
 */
const CardsBlockEdit = ({ attributes, setAttributes, className }) => {
	const { columns } = attributes;
	const initialRangeValue = 2;

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
				orientation="horizontal"
				template={[['sinag/card']]}
				allowedBlocks={['sinag/card']}
			/>
		</div>
	);
};
export default CardsBlockEdit;
