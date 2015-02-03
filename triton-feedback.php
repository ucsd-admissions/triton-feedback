<?php
/**
 * Plugin Name: Triton Feedback
 * Description: A website feedback tool powered by AngularJS and Firebase.
 * Version: 0.0.1
 * Author: Tom Borger <tborger@ucsd.edu>
 * License: Three-Clause BSD
 */

// Main plugin class
include_once( 'class-TritonFeedback.php' );
include_once( 'class-TritonFeedbackSettings.php' );

new TritonFeedbackSettings();
new TritonFeedback();