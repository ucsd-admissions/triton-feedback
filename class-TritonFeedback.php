<?php
class TritonFeedback{

	public function enabled(){
		return get_option( 'trifi_enabled', false );
	}

	public function maybe_set_cookie(){
		$param = get_option( 'trifi_param', 'test' );
		$param_exists = $param && isset( $_GET[ $param ] );
		if( $param_exists ){
			// Set cookie for next page load; expires at end of session
			setcookie( 'triton_feedback_access', true, 0, '/' );

			$hashed_ip = md5( $_SERVER['REMOTE_ADDR'] );
			setcookie( 'triton_feedback_session', $hashed_ip, 0, '/' );
		}
	}

	public function register_frontend(){
		wp_register_script( 'angularjs', 'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.11/angular.min.js', array(), null, true );
		wp_register_script( 'angular-cookies', 'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.11/angular-cookies.js', array( 'angularjs' ), null, true );
		wp_register_script( 'firebase', 'https://cdn.firebase.com/js/client/2.0.4/firebase.js', array( 'angularjs' ), null, true );
		wp_register_script( 'angularfire', 'https://cdn.firebase.com/libs/angularfire/0.9.2/angularfire.min.js', array( 'angularjs', 'firebase' ), null, true );
		wp_register_script( 'triton-feedback', plugins_url( 'js/tritonfeedback.min.js', __FILE__ ), array( 'angularjs', 'angular-cookies', 'firebase', 'angularfire' ), null, true );
		wp_register_style( 'triton-feedback', plugins_url( 'css/tritonfeedback.css', __FILE__ ), array(), time() );
	}

	public function enqueue_frontend(){
		wp_enqueue_script( 'triton-feedback' );
		wp_localize_script( 'triton-feedback', 'tritonFeedbackData', array(
			'templateUrl' => plugins_url( 'src/template.html', __FILE__ )
		) );
		wp_enqueue_style( 'triton-feedback' );
	}

	public function print_template(){
		?>

		<div class='triton-feedback' data-ng-app='tritonFeedback' data-ng-controller='mainCtrl' data-ng-include='getTemplate()' data-ng-class="{visible:visible}"></div>

		<?php
	}
	
	public function __construct(){

		if( ! $this->enabled() ){
			return;
		}

		$this->maybe_set_cookie();
		
		add_action( 'wp_enqueue_scripts', array( $this, 'register_frontend' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_frontend' ) );
		add_action( 'wp_footer', array( $this, 'print_template' ) );

	}

}