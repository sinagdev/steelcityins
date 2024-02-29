<?php
/**
 * Accordion dynamic block PHP.
 *
 * This file renders the dynamic block.
 *
 * @param  array $args 					Arguments from get_template call.
 * @param  array $args[ 'attributes' ]  Block attributes.
 * @param  array $args[ 'content' ]     Block content.
 * @param  array $args[ 'block' ]       Block instance.
 * @return string
 */
?>

<?php $block_id = $args['attributes']['blockId']; ?>

<script>
	document.addEventListener('DOMContentLoaded', function () {
		var elems = document.querySelector('#<?php echo $block_id ?>.collapsible');
		var instances = M.Collapsible.init(elems);

		// Add the collapsible-header class to all heading blocks
		var headingBlocks = document.querySelectorAll('#<?php echo $block_id ?> .accordion__item > .accordion__item-heading');
		if (headingBlocks) {
			headingBlocks.forEach(function (headingBlock) {
				headingBlock.classList.add('collapsible-header');
			});
		}
	});
</script>

<div class="<?php echo $args['attributes']['align'] ?? 'center'; ?>" id="<?php echo $args['attributes']['blockId'] ?? ''; ?>">
	<?php echo $args['content'] ?? 'Dynamic Block'; ?>
</div>
