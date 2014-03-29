'use strict';

describe('Sell Controller', function () {

    beforeEach(module('getvApp'));

    var controller, rootScope, scope;

    beforeEach(inject(function ($injector) {
        rootScope = $injector.get('$rootScope');
        scope = rootScope.$new();
        controller = $injector.get('$controller')('SellController', {
            $scope : scope
        });
    }));

    describe('Initialization', function () {
        it('should attach the order to the scope', function () {
            expect(scope.order).toBeDefined();
        });

        it('should have no items in the order', function () {
            expect(scope.order.items.length).toEqual(0);
        });

        it('should have user defined', function () {
            expect(scope.user).toBeDefined();
        });
    });

    describe('Initialization', function () {

    });
});
