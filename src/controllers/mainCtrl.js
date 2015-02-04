angular.module( 'tritonFeedback' ).controller( 'mainCtrl', function( $scope, $cookies, getTritonFeedbackData, deviceDetector, $firebase ){
	'use strict';

	var _this = this;

	/* ------------------------------------------------------------------------ *
	 * Model
	 * ------------------------------------------------------------------------ */

	$scope.authenticated = false;

	$scope.visible = false;

	$scope.env = {
		browser: deviceDetector.browser,
		device: deviceDetector.device,
		os: deviceDetector.os
	};

	$scope.path = window.location.pathname;

	$scope.error = false;

	$scope.wp = null;

	$scope.firebase = null;

	$scope.feedback = {};


	/* ------------------------------------------------------------------------ *
	 * Internal
	 * ------------------------------------------------------------------------ */

	this.authenticate = function( $cookies ){
		var access = $cookies.triton_feedback_access;
		return access ? true : false; 
	};

	this.connect = function( firebaseName ){
		var connection = new Firebase( 'https://' + firebaseName + '.firebaseio.com/' );
		return connection ? connection : null;
	};


	/* ------------------------------------------------------------------------ *
	 * API
	 * ------------------------------------------------------------------------ */

	$scope.getTemplate = function(){
		return _this.authenticated ? $scope.wp.templateUrl : '';
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
			$scope.callback
		);
	};

	$scope.callback = function( error ){
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

	this.init = function(){

		_this.authenticated = _this.authenticate( $cookies );

		if( ! _this.authenticated ){
			return;
		}

		$scope.wp = getTritonFeedbackData();

		$scope.firebase = this.connect( $scope.wp.firebase );

		if( ! $scope.firebase ){
			$scope.error = true;
		}

	};

	this.init();

});