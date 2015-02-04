angular.module( 'tritonFeedback' ).service( 'firebaseManager', function( tritonFeedbackData ){
	'use strict';

	var _this = this;

	/* ------------------------------------------------------------------------ *
	 * Model
	 * ------------------------------------------------------------------------ */

	this.firebaseName = tritonFeedbackData.firebase;

	this.connected = false;


	/* ------------------------------------------------------------------------ *
	 * API
	 * ------------------------------------------------------------------------ */

	this.connect = function(){

		if( ! _this.firebaseName ){
			return false;
		}

		var connection = new Firebase( 'https://' + _this.firebaseName + '.firebaseio.com/' );

		if( connection ){
			_this.connected = true;
			return true;
		} else {
			return false;
		}
	};

	this.push = function( data, callback ){

		if( ! _this.connected ){
			return false; 
		}

		var ref = connection.child( 'tickets' );
		ref.push(
			{
				time: new Date().getTime(),
				session: $cookies.triton_feedback_session,
				browser: $scope.env.browser,
				device: $scope.env.device,
				os: $scope.env.os,
				path: $scope.path,
				message: $scope.feedback.message 
			},
			callback
		);

		return true;

	};

});