<?php
global $sinag_search_form_atts;
if (!is_array($sinag_search_form_atts)) return;

// Get the current website URL/domain
$current_domain = $_SERVER['HTTP_HOST'];

// Create the placeholder text
$placeholder_text = 'Search ' . $current_domain;

?>
<div class="search-wrap">
    <button class="btn waves-effect waves-light search-button" aria-describedby="search-btn">
        <i class="material-icons">search</i>
    </button>

    <form id="<?php echo $sinag_search_form_atts['form_id']; ?>" role="search" method="get"
          class="<?php echo $sinag_search_form_atts['form_class']; ?>"
          action="<?php echo esc_url(home_url('/')); ?>">
        <div class="input-group input-group--overlay input-field">
            <?php
            printf(
                '<i class="material-icons prefix">search</i><input id="%1$s" type="search" class="form-control" placeholder="%2$s" value="%3$s" name="s" title="%4$s" aria-label="%5$s" aria-describedby="%6$s"/>',
                $sinag_search_form_atts['input_id'] ?? 'search-input',
                esc_attr($placeholder_text), // Use esc_attr to sanitize the placeholder text
                get_search_query(),
                $sinag_search_form_atts['title'] ?? 'Search',
                $sinag_search_form_atts['aria-label'] ?? 'Search',
                $sinag_search_form_atts['aria-describedby'] ?? 'search-btn'
            );
            ?>
        </div>
    </form>
</div>
<?php unset($sinag_search_form_atts); ?>
