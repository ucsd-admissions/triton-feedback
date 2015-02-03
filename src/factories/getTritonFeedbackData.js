angular.module( 'tritonFeedback' ).factory( 'getTritonFeedbackData', function(){
	'use strict';

	this.defaultObject = {
		templateUrl: 'wp-content/plugins/triton-feedback/src/template.html'
	};

	return 'undefined' === typeof tritonFeedbackData ? this.defaultObject : tritonFeedbackData;

});