(function(){
	'use strict';

	describe( 'Main Controller', function(){
		beforeEach( module( 'tritonFeedback' ) );

		var $controller;

		beforeEach( 
			inject( function( _$controller_ ){
				$controller = _$controller_;
			})
		);

		describe( 'getTemplate', function(){

			it( 'should return an empty string if cookie is NOT set', function(){
				var $scope = {};
				var $cookies = { triton_feedback: false };
				var mainCtrl = $controller( 'mainCtrl', { $scope: $scope, $cookies: $cookies } );
				expect( $scope.getTemplate() ).toEqual( '' );
			});

			it( 'should return a string if the cookie IS set', function(){
				var $scope = {};
				var $cookies = { triton_feedback: true };
				var mainCtrl = $controller( 'mainCtrl', { $scope: $scope, $cookies: $cookies } );
				expect( $scope.getTemplate() ).not.toEqual( '' );
			});

		});

	});
	
})();