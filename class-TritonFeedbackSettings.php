<?php
class TritonFeedbackSettings{
	
	public function add_options_page(){
		add_options_page( 'Triton Feedback Options', 'Triton Feedback', 'manage_options', 'triton_feedback', array( $this, 'render_options_page' ) );
	}

	public function render_options_page(){
		?>

		<div class='wrap'>
			<h2>Triton Feedback Options</h2>
			<form method="POST" action="options.php">

				<?php 
				settings_fields( 'triton_feedback' );	
				do_settings_sections( 'triton_feedback' );
				submit_button();
				?>

			</form>
		</div>

	<?php
	}

	public function add_settings_section(){
		add_settings_section( 'general', 'General Options', array( $this, 'render_general_settings' ), 'triton_feedback' );
	}

	public function render_general_settings(){
		// Null
	}

	public function add_settings_fields(){
		
		// Enabled		
		add_settings_field( 'trifi_enabled', 'Enable Feedback', array( $this, 'render_setting_trifi_enabled' ), 'triton_feedback', 'general' );
		register_setting( 'triton_feedback', 'trifi_enabled', array( $this, 'sanitize_setting_trifi_enabled' ) );

		// $_GET parameter
		add_settings_field( 'trifi_param', 'Access Parameter', array( $this, 'render_setting_trifi_param' ), 'triton_feedback', 'general' );
		register_setting( 'triton_feedback', 'trifi_param', array( $this, 'sanitize_setting_trifi_param' ) );

	}

	public function render_setting_trifi_enabled(){
		$enabled = get_option( 'trifi_enabled', false );
		$checked = $enabled ? 'checked ' : '';
		echo "<input type='checkbox' name='trifi_enabled' id='trifi_enabled' " . $checked . "/>";
		echo "<label for='trifi_enabled'>Enable Triton Feedback on my site</label>";
	}

	public function sanitize_setting_trifi_enabled( $input ){
		return $input ? true : false;
	}

	public function render_setting_trifi_param(){
		$param = get_option( 'trifi_param', 'test' );
		echo "<input type='text' name='trifi_param' id='trifi_param' value='" . $param . "' />";
	}

	public function sanitize_setting_trifi_param( $input ){
		return sanitize_title_with_dashes( $input, null, 'save' );
	}

	public function __construct(){
		add_action( 'admin_menu', array( $this, 'add_options_page' ) );
		add_action( 'admin_init', array( $this, 'add_settings_section' ) );
		add_action( 'admin_init', array( $this, 'add_settings_fields' ) );
	}

}