/**
 * Counters editor interface
 *
 * This defines how the block works
 * within the back-end block editor.
 */

/**
 * Import dependencies
 */
import classnames from 'classnames';
import { arrowUp, arrowDown, more } from '@wordpress/icons';

const { useBlockProps, InnerBlocks, InspectorControls } = wp.blockEditor;
const {
	PanelBody,
	PanelRow,
	RangeControl,
	ToggleControl,
	TextControl,
	__experimentalInputControl,
} = wp.components;

/**
 * Generate block editor component
 */
const CountersBlockEdit = ({ attributes, setAttributes, className }) => {
	const {
		prependIcon,
		counterValue,
		appendIcon,
		duration,
		useEasing,
		useGrouping,
		separator,
		decimal,
		decimalPlaces,
	} = attributes;

	const ALLOWED_BLOCKS = [
		'core/heading',
		'core/paragraph',
		'core/navigation-link',
		'core/buttons',
	];

	const TEMPLATE = [
		[
			'core/heading',
			{
				level: 3,
				placeholder: 'Title',
				className: 'counters__title',
			},
		],
		[
			'core/paragraph',
			{
				placeholder: 'Additional text here...',
				className: 'counters__text',
			},
		],
	];

	return (
		<>
			<div
				{...useBlockProps({
					className: classnames('counters', className),
				})}
			>
				<InspectorControls>
					<PanelBody
						title="Counter Content"
						initialOpen={true}
					>
						<PanelRow>
							<__experimentalInputControl
								label="Counter prepend Icon"
								labelPosition="top"
								value={prependIcon}
								isPressEnterToChange
								prefix="fa-"
								onChange={(prependIconValue) => {
									setAttributes({
										prependIcon: prependIconValue,
									});
								}}
							/>
						</PanelRow>
						<PanelRow>
							<TextControl
								label="Counter Value"
								labelPosition="top"
								value={counterValue}
								type="number"
								onChange={(counterValueChange) => {
									setAttributes({
										counterValue: counterValueChange,
									});
								}}
							/>
						</PanelRow>
						<PanelRow>
							<__experimentalInputControl
								label="Counter append Icon"
								labelPosition="top"
								value={appendIcon}
								isPressEnterToChange
								prefix="fa-"
								onChange={(appendIconValue) => {
									setAttributes({
										appendIcon: appendIconValue,
									});
								}}
							/>
						</PanelRow>
					</PanelBody>
					<PanelBody
						title="Counter Settings"
						initialOpen={true}
					>
						<PanelRow>
							<RangeControl
								label="Counter Duration"
								help="Choose the duration of Counter Animation."
								beforeIcon={arrowDown}
								afterIcon={arrowUp}
								step={0.5}
								withInputField={true}
								icon={more}
								separatorType="topFullWidth"
								renderTooltipContent={() => duration}
								value={duration}
								onChange={(durationValue) => {
									setAttributes({
										duration: durationValue,
									});
								}}
								min={0.5}
								max={10}
							/>
						</PanelRow>
						<PanelRow>
							<TextControl
								label="Counter Separator"
								labelPosition="top"
								value={separator}
								onChange={(separatorValue) => {
									setAttributes({
										separator: separatorValue,
									});
								}}
							/>
						</PanelRow>
						<PanelRow>
							<TextControl
								label="Counter Decimal"
								labelPosition="top"
								value={decimal}
								onChange={(decimalValue) => {
									setAttributes({
										decimal: decimalValue,
									});
								}}
							/>
						</PanelRow>
						<PanelRow>
							<TextControl
								label="Counter Decimal Place"
								labelPosition="top"
								value={decimalPlaces}
								type="number"
								onChange={(decimalPlacesValue) => {
									setAttributes({
										decimalPlaces: decimalPlacesValue,
									});
								}}
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label="Use Easing?"
								help={useEasing ? 'Enabled' : 'Disabled'}
								checked={useEasing}
								onChange={(useEasingValue) => {
									setAttributes({
										useEasing: useEasingValue,
									});
								}}
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label="Use Grouping?"
								help={useGrouping ? 'Enabled' : 'Disabled'}
								checked={useGrouping}
								onChange={(useGroupingValue) => {
									setAttributes({
										useGrouping: useGroupingValue,
									});
								}}
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>

				<div className="card">
					<div className="card-header">
						{prependIcon ? (
							<i className={`fa-solid fa-${prependIcon}`}></i>
						) : null}
						<span className="counters__number">{counterValue}</span>
						{appendIcon ? (
							<i className={`fa-solid fa-${appendIcon}`}></i>
						) : null}
					</div>

					<div className="card-body">
						<InnerBlocks
							orientation="horizontal"
							allowedBlocks={ALLOWED_BLOCKS}
							template={TEMPLATE}
						/>
					</div>
				</div>
			</div>
		</>
	);
};
export default CountersBlockEdit;
