'use strict';

describe( 'getTritonFeedbackData', function(){

	beforeEach( module( 'tritonFeedback' ) );

	it( 'should return values from tritonFeedbackData if available', function(){

		// Mocking the object written by WordPress
	 	window.tritonFeedbackData = { templateUrl: 'url_from_wp' };

	 	var service;

		inject( function( $injector ){
			service = $injector.get( 'getTritonFeedbackData' );
		});

		expect( service().templateUrl ).toBe( 'url_from_wp' );

	});

	it( 'should return default values if tritonFeedbackData is unavailable', function(){
		
		delete window.tritonFeedbackData;

		var service;

		inject( function( $injector ){
			service = $injector.get( 'getTritonFeedbackData' );
		});

		expect( service().templateUrl ).toBe( 'wp-content/plugins/triton-feedback/src/template.html' );


	});


});