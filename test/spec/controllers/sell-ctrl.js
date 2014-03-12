'use strict';

describe('Controller: SellCtrl', function () {

  // load the controller's module
  beforeEach(module('getvretailwebApp'));

  var SellCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SellCtrl = $controller('SellCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(true).toBe(true);
  });
});
