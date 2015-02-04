'use strict';

var getTritonFeedbackData;

describe( 'getTritonFeedbackData service', function(){

	beforeEach( module( 'tritonFeedback' ) );

	it( 'should return values from tritonFeedbackData if available', function(){

		// Mocking the object written by WordPress
	 	window.tritonFeedbackData = { templateUrl: 'wordpress data' }

		inject( function( _getTritonFeedbackData_ ){
  		getTritonFeedbackData = _getTritonFeedbackData_;
 		});	

		expect( getTritonFeedbackData.templateUrl ).toBe( 'wordpress data' );

	});

	it( 'should return default values if tritonFeedbackData is unavailable', function(){
		
		delete window.tritonFeedbackData;
		
		inject( function( _getTritonFeedbackData_ ){
  		getTritonFeedbackData = _getTritonFeedbackData_;
 		});		
		
		expect( getTritonFeedbackData.templateUrl ).toBe( 'wp-content/plugins/triton-feedback/src/template.html' );
	});

});