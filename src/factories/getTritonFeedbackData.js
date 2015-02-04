angular.module( 'tritonFeedback' ).factory( 'getTritonFeedbackData', function(){
	'use strict';

	var defaults = {
		templateUrl: 'wp-content/plugins/triton-feedback/src/template.html',
		firebase: ''
	};

	return function(){
		return 'undefined' === typeof tritonFeedbackData ? defaults : tritonFeedbackData;
	};

});