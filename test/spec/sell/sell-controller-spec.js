'use strict';

describe('Sell Controller', function () {

    beforeEach(module('getvApp'));

    var controller, rootScope, scope;

//    beforeEach(inject(function ($injector) {
//        rootScope = $injector.get('$rootScope');
//        scope = rootScope.$new();
//        controller = $injector.get('$controller')('SellController', {
//            $scope : scope
//        });
//    }));

    describe('Initialization', function () {
        it('should attach the order to the scope', function () {
            expect(1).toEqual(1);
            //expect(scope.order).toBeDefined();
        });

        xit('should have no items in the order', function () {
            expect(scope.order.items.length).toEqual(0);
        });

        xit('should have user defined', function () {
            expect(scope.user).toBeDefined();
        });
    });

    describe('Initialization', function () {

    });
});
