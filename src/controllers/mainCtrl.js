angular.module( 'tritonFeedback' ).controller( 'mainCtrl', function( $scope, $cookies, getTritonFeedbackData, deviceDetector ){
	'use strict';

	var feedbackData = getTritonFeedbackData;


	/* ------------------------------------------------------------------------ *
	 * Model
	 * ------------------------------------------------------------------------ */

	$scope.visible = false;

	$scope.env = {
		browser: deviceDetector.browser,
		device: deviceDetector.device,
		os: deviceDetector.os
	};

	/* ------------------------------------------------------------------------ *
	 * API
	 * ------------------------------------------------------------------------ */

	$scope.getTemplate = function(){
		var authenticated = $cookies.triton_feedback_access;
		return authenticated ? feedbackData.templateUrl : '';
	};

	$scope.open = function(){
		$scope.visible = true;
		angular.element( document.getElementsByTagName( 'body' ) ).css( 'overflow', 'hidden' );
	};

	$scope.close = function(){
		$scope.visible = false;
		angular.element( document.getElementsByTagName( 'body' ) ).css( 'overflow', '' );
	};

	$scope.submitFeedback = function(){

	};

});