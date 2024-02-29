<?php

function enqueue_custom_styles_and_scripts()
{
    /**
     * Enqueue Font
     */
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap', false);

    /**
     * Materialize CSS
     */
    wp_enqueue_style('materialize-icons', 'https://fonts.googleapis.com/icon?family=Material+Icons', array(), null);

    /**
     * AOS
     */
    wp_enqueue_style('aos', get_template_directory_uri() . '/node_modules/aos/dist/aos.css', array(), null);
    wp_enqueue_script(
        'aos',
        get_template_directory_uri() . '/node_modules/aos/dist/aos.js',
        array(),
        '2.3.1',
        true
    );


    /**
     * Font Awesome
     */
    wp_enqueue_script(
        'font-awesome-scripts',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/js/all.min.js',
        array(),
        '6.2.1',
        true
    );
    wp_enqueue_style(
        'font-awesome-style',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css',
        array(),
        '6.2.1'
    );

    /**
     * Swiperjs
     */
    wp_enqueue_script(
        'swiper-scripts',
        'https://cdnjs.cloudflare.com/ajax/libs/Swiper/10.3.0/swiper-bundle.min.js',
        array(),
        '10.3.0',
        true
    );

    /**
     * Google Maps API
     */

    // Get the Google API key from the options
    $google_api_key = get_option('google_maps_api_key', '');

    // Check if a valid Google API key exists before enqueuing the script
    if (!empty($google_api_key)) {
        // Enqueue the Google Maps API script with async and defer attributes
        wp_enqueue_script(
            'google-maps',
            "https://maps.googleapis.com/maps/api/js?key=$google_api_key&callback=initializeMap",
            ['sinag-block-map-script'], // Add 'sinag-block-map-script' as a dependency
            false,
            true
        );
        wp_script_add_data('google-maps', 'async', true);
        wp_script_add_data('google-maps', 'defer', true);
    }

}

add_action('wp_enqueue_scripts', 'enqueue_custom_styles_and_scripts');

