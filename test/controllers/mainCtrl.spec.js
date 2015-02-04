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
			var $cookies = { triton_feedback_access: false };
			var mainCtrl = $controller( 'mainCtrl', { $scope: $scope, $cookies: $cookies } );
			expect( $scope.getTemplate() ).toEqual( '' );
		});

		// We're not testing the specific URL here, just the getter mechanism.
		it( 'should return a string if the cookie IS set', function(){
			var $scope = {};
			var $cookies = { triton_feedback_access: true };
			var mainCtrl = $controller( 'mainCtrl', { $scope: $scope, $cookies: $cookies } );
			expect( $scope.getTemplate() ).not.toEqual( '' );
		});

	});

	describe( 'toggleVisibility', function(){

		it( 'should start invisible', function(){
			var $scope = {};
			var $cookies = { triton_feedback: true };
			var mainCtrl = $controller( 'mainCtrl', { $scope: $scope, $cookies: $cookies } );
			expect( $scope.visible ).toBe( false );
		});

		it( 'should be visible after calling toggleVisibility', function(){
			var $scope = {};
			var $cookies = { triton_feedback: true };
			var mainCtrl = $controller( 'mainCtrl', { $scope: $scope, $cookies: $cookies } );
			$scope.toggleVisibility();
			expect( $scope.visible ).toBe( true );
		});

	});

});