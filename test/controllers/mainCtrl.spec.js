'use strict';

describe( 'Main Controller', function(){
	beforeEach( module( 'tritonFeedback' ) );

	var $controller;

	beforeEach( 
		inject( function( _$controller_ ){
			$controller = _$controller_;
		})
	);

	describe( 'mainCtrl.authenticate', function(){

		it( 'should return false if cookie is undefined or falsy', function(){

			var $scope = {}, mainCtrl = $controller( 'mainCtrl', { $scope: $scope } );

			var falsyCookies = [
				{},
				{ triton_feedback_access: 0 },
				{ triton_feedback_access: false }
			];

			angular.forEach( falsyCookies, function( cookie ){
				expect( mainCtrl.authenticate( cookie ) ).toEqual( false ); 
			});
		
		});

		it( 'should return true if cookie is truthy', function(){

			var $scope = {}, mainCtrl = $controller( 'mainCtrl', { $scope: $scope } );
			
			var truthyCookies = [
				{ triton_feedback_access: 1 },
				{ triton_feedback_access: true },
				{ triton_feedback_access: 'string' }
			];

			angular.forEach( truthyCookies, function( cookie ){
				expect( mainCtrl.authenticate( cookie ) ).toEqual( true ); 
			});

		});

	});

	describe( '$scope.getTemplate', function(){

		it( 'should return an empty string if not authenticated', function(){
			var $scope = {}, mainCtrl = $controller( 'mainCtrl', { $scope: $scope } );
			mainCtrl.authenticated = false;
			expect( $scope.getTemplate() ).toEqual( '' );
		});

		it( 'should return the template from wp if authenticated', function(){
			var $scope = {}, mainCtrl = $controller( 'mainCtrl', { $scope: $scope } );
			mainCtrl.authenticated = true;
			$scope.wp = { templateUrl: 'a string' };
			expect( $scope.getTemplate() ).toEqual( 'a string' );
		});

	});

	describe( 'application visibility', function(){

		it( 'should start out invisible', function(){
			var $scope = {}, mainCtrl = $controller( 'mainCtrl', { $scope: $scope } );
			expect( $scope.visible ).toEqual( false );
		});

		it( 'should become visible after calling $scope.open', function(){
			var $scope = {}, mainCtrl = $controller( 'mainCtrl', { $scope: $scope } );
			$scope.open();
			expect( $scope.visible ).toEqual( true );
		});

		it( 'should become invisible after calling $scope.close', function(){
			var $scope = {}, mainCtrl = $controller( 'mainCtrl', { $scope: $scope } );
			$scope.visible = true;
			$scope.close();
			expect( $scope.visible ).toEqual( false );
		});
	});

	describe( '$scope.resetFeedback', function(){

		it( 'should clear all feedback fields', function(){
			var $scope = {}, mainCtrl = $controller( 'mainCtrl', { $scope: $scope } );
			$scope.feedback = { foo: 'bar' };
			$scope.resetFeedback();
			expect( $scope.feedback ).toEqual( {} );
		});
	});

	describe( '$scope.throw', function(){

		it( 'should set the error to true', function(){
			var $scope = {}, mainCtrl = $controller( 'mainCtrl', { $scope: $scope } );
			expect( $scope.error ).toEqual( false );
			$scope.throw();
			expect( $scope.error ).toEqual( true );
		});
	});
});