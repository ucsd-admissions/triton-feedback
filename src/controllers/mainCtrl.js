angular.module( 'tritonFeedback' ).controller( 'mainCtrl', function( $scope, $cookies, tritonFeedbackData, deviceDetector, firebaseManager, $timeout, $sce ){
	'use strict';

	var _this = this;

	/* ------------------------------------------------------------------------ *
	 * Model
	 * ------------------------------------------------------------------------ */

	$scope.authenticated = false;

	$scope.visible = false;

	$scope.showConfirmation = false;

	$scope.env = {
		browser: deviceDetector.browser,
		device: deviceDetector.device,
		os: deviceDetector.os
	};

	$scope.path = window.location.pathname;

	$scope.error = false;

	$scope.firebase = firebaseManager;

	$scope.feedback = {
		message: null,
		category: 'broken'
	};

	$scope.wp = null;

	$scope.feedbackCategories = [
		'broken',
		'awesome',
		'surprising',
		'confusing',
		'annoying',
		'other'
	];


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
	};

	$scope.close = function(){
		$scope.visible = false;
	};

	$scope.submitFeedback = function(){
		var success = $scope.firebase.push(
			{
				time: new Date().getTime(),
				session: $cookies.triton_feedback_session,
				browser: $scope.env.browser,
				device: $scope.env.device,
				os: $scope.env.os,
				path: $scope.path,
				message: $scope.feedback.message,
				category: $scope.feedback.category
			},
			$scope.callback
		);

		if( ! success ){
			$scope.throw();
		}
	};

	$scope.callback = function( error ){
		if( error ){
			$scope.$apply( $scope.error() );
		} else {
			$scope.$apply( $scope.resetFeedback() );
		}
	};

	$scope.throw = function(){
		$scope.error = true;
	};

	$scope.resetFeedback = function(){
		$scope.feedback = {
			message:null,
			category:'broken'
		};
		$scope.showConfirmation = true;
		$timeout( function(){
			$scope.showConfirmation = false;
		}, 5000 );
	};


	/* ------------------------------------------------------------------------ *
	 * Init
	 * ------------------------------------------------------------------------ */

	this.init = function(){

		_this.authenticated = _this.authenticate( $cookies );

		if( ! _this.authenticated ){
			return;
		}

		$scope.wp = tritonFeedbackData;

		$scope.instructions = $scope.wp.instructions;

		var connected = $scope.firebase.connect();
		if( ! connected ){
			$scope.throw();
		}

	};

	this.init();

});