'use strict';

describe('Controller: SellCtrl', function () {

  // load the controller's module
  beforeEach(module('getvApp'));

  var SellCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SellCtrl = $controller('SellCtrl', {
      $scope: scope
    });
  }));

  it('should attach the order to the scope', function () {
    expect(scope.order).toBeDefined();
  });

  xit('should have items in the order', function(){
    expect(scope.order.items).toBeNonEmptyArray();
  });
});
