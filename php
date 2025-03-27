<?php
/**
 * Plugin Name: Trade Quiz Plugin
 * Description: A trade quiz plugin for IB Economics with 20 questions, progress tracking, and feedback.
 * Version: 1.0
 * Author: CuriousEconomist
 */

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

function itqp_enqueue_scripts() {
    wp_enqueue_style( 'itqp-style', plugin_dir_url( __FILE__ ) . 'style.css' );
    wp_enqueue_script( 'itqp-script', plugin_dir_url( __FILE__ ) . 'script.js', array('jquery'), null, true );
    wp_localize_script( 'itqp-script', 'itqpData', array(
        'questions' => json_decode(file_get_contents(plugin_dir_path(__FILE__) . 'questions.json'), true)
    ));
}
add_action( 'wp_enqueue_scripts', 'itqp_enqueue_scripts' );

function itqp_display_quiz() {
    return '<div id="trade-quiz-app"></div>';
}
add_shortcode('trade_quiz', 'itqp_display_quiz');
?>
