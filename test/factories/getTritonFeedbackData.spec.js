'use strict';

var getTritonFeedbackData;

describe( 'getTritonFeedbackData service', function(){

	beforeEach( module( 'tritonFeedback' ) );

	it( 'should return values from tritonFeedbackData if available', function(){
	 	window.tritonFeedbackData = { templateUrl: 'wordpress data' }
		inject( function( _getTritonFeedbackData_ ){
  		getTritonFeedbackData = _getTritonFeedbackData_;
 		});	
		expect( getTritonFeedbackData.templateUrl ).toBe( 'wordpress data' );
	});

	it( 'should default values if tritonFeedbackData is unavailable', function(){
		delete window.tritonFeedbackData;
		inject( function( _getTritonFeedbackData_ ){
  		getTritonFeedbackData = _getTritonFeedbackData_;
 		});		
		expect( getTritonFeedbackData.templateUrl ).not.toBe( 'wordpress data' );
	});

});