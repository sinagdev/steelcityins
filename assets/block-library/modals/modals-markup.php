<?php
/**
 * Modals dynamic block PHP.
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

<script type="module">
	document.addEventListener('DOMContentLoaded', function () {
	var elems = document.querySelector('#<?php echo $block_id?> .modal');
    var instances = M.Modal.init(elems);
	});
</script>

<div <?php echo get_block_wrapper_attributes( array( 'class' => 'modals' ) ) ?>>
	<?php echo $args[ 'content' ] !== '' ? $args[ 'content' ] : 'Modals Block'; ?>
</div>