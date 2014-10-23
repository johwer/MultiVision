describe('mvUser', function () {
    var user; 

    beforeEach(module('app'));

    beforeEach(inject(function(mvUser){
        user = new mvUser();
        user.roles = [];
    }));

    describe('isAdmin', function () {
        it("should return false if the roles array does not have an admin entry", function(){
            user.roles = ['not Admin'];
            expect(user.isAdmin()).to.be.false;
        });

        it("should return true if the roles array does not have an admin entry", function(){
            user.roles = ['admin'];
            expect(user.isAdmin()).to.be.true;
        });
    });


        

});