'use strict';

describe( 'firebaseManager', function(){

	beforeEach( module( 'tritonFeedback' ) );

	it( 'should return false when unable to connect', function(){

		// We are providing no firebaseName, so there should be no connection

	 	var service;
		inject( function( $injector ){
			service = $injector.get( 'firebaseManager' );
		});

		expect( service.connect() ).toEqual( false );
		expect( service.connected ).toEqual( false );

	});

	describe( 'push', function(){

		it( 'should return false if there is no connection', function(){
		 	
			// We are providing no firebaseName, so there should be no connection

			var service;
			inject( function( $injector ){
				service = $injector.get( 'firebaseManager' );
			});

			// Dummy data and callback
			var data = {};
			var callback = function(){};

			expect( service.push( data, callback ) ).toEqual( false );

		});
	});

});