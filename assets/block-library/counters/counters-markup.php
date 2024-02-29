<?php
/**
 * Counters dynamic block PHP.
 *
 * This file renders the dynamic block.
 *
 * @param  array $args                     Arguments from get_template call.
 * @param  array $args[ 'attributes' ]  Block attributes.
 * @param  array $args[ 'content' ]     Block content.
 * @param  array $args[ 'block' ]       Block instance.
 * @return string
 */
$attributes = $args['attributes'];
?>
<div class="<?php echo $args['attributes']['className'] ?? 'counters'; ?>">

    <?php
   $config = [
   	'startVal' =>  '0',
   	'duration' => $attributes['duration'] ?? 1.5,
   	'separator' =>  $attributes['separator'] ?? ',',
   	'decimal' => $attributes['decimal'] ?? '.',
    'decimalPlaces' => $attributes['decimalPlaces'] ?? 0,
   	'prefix' => $attributes['prefix'] ?? '',
   	'suffix' => $attributes['suffix'] ?? '',
   	'useEasing' => $attributes['useEasing'] ?? true,
   	'useGrouping' => $attributes['useGrouping'] ?? true,
   ];
   $config = sinag_array_to_json($config);
   ?>

    <div class="card">


        <div class="card-header">
            <?php if(!empty($attributes['prependIcon'])): ?>
            <i class="fa-solid fa-<?php echo $attributes['prependIcon']?>"></i>
            <?php endif; ?>
            <span id="counters__number-<?php echo uniqid(); ?>" class="counters__number"
                data-counter-number="<?php echo $attributes['counterValue'] ?? '0'; ?>"
                data-config="<?php echo $config; ?>">
                <?php echo $attributes['counterValue'] ?? '0'; ?>
            </span>
            <?php if(!empty($attributes['appendIcon'])): ?>
            <i class="fa-solid fa-<?php echo $attributes['appendIcon']?>"></i>
            <?php endif; ?>
        </div>

        <div class="card-body">
            <?php echo $args['content'] ?? ''; ?>
        </div>

    </div>
</div>