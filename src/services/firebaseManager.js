angular.module( 'tritonFeedback' ).service( 'firebaseManager', function( tritonFeedbackData, $cookies ){
	'use strict';

	var _this = this;

	/* ------------------------------------------------------------------------ *
	 * Model
	 * ------------------------------------------------------------------------ */

	this.firebaseName = tritonFeedbackData.firebase;

	this.connection = null;

	this.connected = false;


	/* ------------------------------------------------------------------------ *
	 * API
	 * ------------------------------------------------------------------------ */

	this.connect = function(){

		if( ! _this.firebaseName ){
			return false;
		}

		_this.connection = new Firebase( 'https://' + _this.firebaseName + '.firebaseio.com/' );

		if( _this.connection ){
			return true;
		} else {
			return false;
		}
	};

	this.push = function( data, callback ){

		if( ! _this.connection ){
			return false; 
		}

		var ref = _this.connection.child( 'tickets' );
		ref.push( data, callback );

		return true;

	};

});