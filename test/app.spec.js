(function(){
	'use strict';

	describe( 'the app', function(){

		beforeEach( module( 'tritonFeedback' ) );

		it( 'should exist', function(){
			var module = angular.module( 'tritonFeedback' );
			expect( module ).toBeDefined();
		});
	});
})();