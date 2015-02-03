<?php
class TritonFeedback{

	public function authenticate(){

		// Bail right away if not enabled
		$enabled = get_option( 'trifi_enabled', false );
		if( ! $enabled ){
			return false;
		}

		// If user has access cookie, let them through
		$cookie_exists = isset( $_COOKIE[ 'triton_feedback' ] );
		if( $cookie_exists ){
			return true;
		}
		
		// If user is entering for the first time, check for query param
		$param = get_option( 'trifi_param', 'test' );
		$param_exists = $param && isset( $_GET[ $param ] );
		if( $param_exists ){
			// Set cookie for next page load; expires at end of session
			setcookie( 'triton_feedback', true, 0, '/' );
			return true;
		}

		// Nope.
		return false;

	}

	public function register_frontend(){
		wp_register_script( 'angularjs', 'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.11/angular.min.js', array(), null, true );
		wp_register_script( 'firebase', 'https://cdn.firebase.com/js/client/2.0.4/firebase.js', array( 'angularjs' ), null, true );
		wp_register_script( 'angularfire', 'https://cdn.firebase.com/libs/angularfire/0.9.2/angularfire.min.js', array( 'angularjs', 'firebase' ), null, true );
		wp_register_script( 'tritonfeedback', plugins_url( 'dist/tritonfeedback.min.js', __FILE__ ), array( 'angularjs', 'firebase', 'angularfire' ), null, true );
	}

	public function enqueue_frontend(){
		wp_enqueue_script( 'tritonfeedback' );
	}
	
	public function __construct(){

		$authenticated = $this->authenticate();

		if( ! $authenticated ){
			return;
		}
		
		add_action( 'wp_enqueue_scripts', array( $this, 'register_frontend' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_frontend' ) );

	}

}