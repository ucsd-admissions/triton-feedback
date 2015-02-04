angular.module( 'tritonFeedback' ).factory( 'tritonFeedbackData', function(){
	'use strict';

	this.defaults = {
		templateUrl: 'wp-content/plugins/triton-feedback/src/template.html',
		firebase: ''
	};

	return 'undefined' === typeof tritonFeedbackData ? this.defaults : tritonFeedbackData;

});