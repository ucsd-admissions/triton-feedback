angular.module( 'tritonFeedback' ).controller( 'mainCtrl', function( $scope, $cookies, getTritonFeedbackData, deviceDetector, $firebase ){
	'use strict';

	var _this = this,
	    feedbackData = getTritonFeedbackData;

	/* ------------------------------------------------------------------------ *
	 * Model
	 * ------------------------------------------------------------------------ */

	$scope.visible = false;

	$scope.env = {
		browser: deviceDetector.browser,
		device: deviceDetector.device,
		os: deviceDetector.os
	};

	$scope.path = window.location.pathname;

	$scope.error = false;

	$scope.fb;

	$scope.feedback = {};


	/* ------------------------------------------------------------------------ *
	 * Internal
	 * ------------------------------------------------------------------------ */
	 
	this.connect = function(){
		var fb = new Firebase( 'https://' + feedbackData.firebase + '.firebaseio.com/' );
		if( fb ){
			return fb;
		} else {
			$scope.error = true;
		}
	}


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
		var ticketsRef = $scope.fb.child( 'tickets' );

		ticketsRef.push(
			{
				time: new Date().getTime(),
				session: $cookies.triton_feedback_session,
				browser: $scope.env.browser,
				device: $scope.env.device,
				os: $scope.env.os,
				path: $scope.path,
				message: $scope.feedback.message 
			},
			$scope.pushed
		);
	};

	$scope.pushed = function( error ){
		if( error ){
			$scope.$apply( function(){
				$scope.error = true;
			});
		} else {
			$scope.$apply( function(){
				$scope.feedback = {};
		});
		}
	};


	/* ------------------------------------------------------------------------ *
	 * Init
	 * ------------------------------------------------------------------------ */

	$scope.fb = this.connect();

});