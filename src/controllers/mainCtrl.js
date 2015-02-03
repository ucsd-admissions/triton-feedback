angular.module( 'tritonFeedback' ).controller( 'mainCtrl', function( $scope, $cookies, getTritonFeedbackData ){
	'use strict';

	var feedbackData = getTritonFeedbackData;
	
	$scope.getTemplate = function(){
		var authenticated = $cookies.triton_feedback;
		return authenticated ? feedbackData.templateUrl : '';
	};

});