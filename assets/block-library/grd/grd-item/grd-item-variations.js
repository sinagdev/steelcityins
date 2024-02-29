/**
 * Grid Item variations
 *
 * This splits the block into several
 * variations.
 */

const { registerBlockVariation } = wp.blocks;
const { __ } = wp.i18n;

registerBlockVariation('sinag/grd-item', [
	{
		name: 'sinag-grd-item-default',
		title: __('Grid Cell', 'sinag'),
		description: __('Freeform grid cell content.', 'sinag'),
		isDefault: true,
		attributes: { variation: 'cell' },
		isActive: (a, b) => a.variation === b.variation,
	},
	{
		name: 'sinag-grd-item-image',
		title: __('Grid Cell Image', 'sinag'),
		description: __('Image within a grid cell.', 'sinag'),
		attributes: { variation: 'image' },
		innerBlocks: [['core/image']],
		isActive: (a, b) => a.variation === b.variation,
	},
	{
		name: 'sinag-grd-item-video',
		title: __('Grid Cell Video', 'sinag'),
		description: __('Video within a grid cell.', 'sinag'),
		attributes: { variation: 'video' },
		innerBlocks: [['core/video']],
		isActive: (a, b) => a.variation === b.variation,
	},
]);
