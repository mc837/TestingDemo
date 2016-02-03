var model = new UserViewModel();

describe('Validation tests', function () {

    describe('Valid date tests', function () {

        it('2nd of FEB should be selectable', function () {
            model.dobDay(2);
            model.dobMonth(2);
            model.dobYear(1984);
            expect(model.isValidDate()).toBe(true);
        });
        it('7th of DEC should be selectable', function () {
            model.dobDay(7);
            model.dobMonth(12);
            model.dobYear(2013);
            expect(model.isValidDate()).toBe(true);
        });
        it('30th of JUL should be selectable', function () {
            model.dobDay(30);
            model.dobMonth(7);
            model.dobYear(2004);
            expect(model.isValidDate()).toBe(true);
        });
        it('6th of OCT should be selectable', function () {
            model.dobDay(6);
            model.dobMonth(10);
            model.dobYear(2012);
            expect(model.isValidDate()).toBe(true);
        });

        it('Should return a class of valid for a valid date', function () {
            model.dobDay(2);
            model.dobMonth(2);
            model.dobYear(1984);
            expect(dobIsValid()).toEqual("valid");
        });

        it('Dob field should be flaged as complete when all fields have values', function () {
            model.dobDay(30);
            model.dobMonth(2);
            model.dobYear(1984);
            expect(model.isDobFieldComplete()).toEqual(true);
        });
    });

    describe('Leap year and invalid date tests', function () {

        // Leap year tests...

        it('30th of FEB should NOT be selectable', function () {
            model.dobDay(30);
            model.dobMonth(2);
            model.dobYear(1984);
            expect(model.isValidDate()).toEqual(false);
        });
        it('31st of FEB should NOT be selectable', function () {
            model.dobDay(31);
            model.dobMonth(2);
            model.dobYear(1984);
            expect(model.isValidDate()).toEqual(false);
        });
        it('31st of APR should NOT be selectable', function () {
            model.dobDay(31);
            model.dobMonth(4);
            model.dobYear(1984);
            expect(model.isValidDate()).toEqual(false);
        });
        it('31st of JUN should NOT be selectable', function () {
            model.dobDay(31);
            model.dobMonth(4);
            model.dobYear(1984);
            expect(model.isValidDate()).toEqual(false);
        });
        it('31st of SEP should NOT be selectable', function () {
            model.dobDay(31);
            model.dobMonth(4);
            model.dobYear(1984);
            expect(model.isValidDate()).toEqual(false);
        });
        it('31st of NOV should NOT be selectable', function () {
            model.dobDay(31);
            model.dobMonth(11);
            model.dobYear(1984);
            expect(model.isValidDate()).toEqual(false);
        });

        it('Should return a class of invalid for an invalid date', function () {
            model.dobDay(30);
            model.dobMonth(2);
            model.dobYear(1984);
            expect(dobIsValid()).toEqual("invalid");
        });

        it('Dob field should be flaged as incomplete when one or more fields are empty', function () {
            model.dobDay(30);
            model.dobMonth(2);
            model.dobYear("");
            expect(model.isDobFieldComplete()).toEqual(false);
        });
    });

    describe('First name validation', function () {

        it('A valid first name should return true', function () {
            model.firstName('FirstName');
            expect(model.firstNameIsValid()).toEqual(true);
        });
        it('An invalid first name should return false', function () {
            model.firstName('FirstName1');
            expect(model.firstNameIsValid()).toEqual(false);
        });
        it('An incomplete first name field should be identified as true', function () {
            model.firstName("");
            expect(model.firstNameIsEmpty()).toEqual(true);
        });
    });

    describe('Surname validation', function () {

        it('A valid surname should return true', function () {
            model.surname('Surname');
            expect(model.surnameIsValid()).toEqual(true);
        });
        it('An invalid surname should return false', function () {
            model.surname('Surname1');
            expect(model.surnameIsValid()).toEqual(false);
        });
        it('An incomplete surname field should be identified as true', function () {
            model.surname("");
            expect(model.surnameIsEmpty()).toEqual(true);
        });
    });

    describe('Role type validation', function () {

        it('An completed roletype will return false', function () {
            model.roleType("Student");
            expect(model.roleTypeIsValid()).toEqual(true);
        });
        it('An incomplete roletype will return false', function () {
            model.roleType("");
            expect(model.roleTypeIsValid()).toEqual(false);
        });
    });

    describe('Whole page validation', function() {
        it('Should remove class to submit button', function () {
            model.firstName('FirstName');
            model.surname('Surname');
            model.dobIsValid(true);
            model.roleType("Student");
            isPageValid();
            expect(isPageValid()).toEqual(true);
        });
        it('Should not remove disabled class to submit button', function() {
            model.firstName('FirstName');
            model.surname('Surname');
            model.dobIsValid(false);
            model.roleType("Student");
            isPageValid();
            expect(isPageValid()).toEqual(false);
        });
    });
});


describe('Calculated values', function () {
    it('Should calculate age correctly', function () {
        var age = calculateAge(1984, 2, 2);

        expect(age).toEqual(31);
    });

    it('Should return correct birthday from date inputs', function () {
        var dob = getDob(1984, 2, 2);

        expect(dob).toEqual("Thu Feb 02 1984");
    });
});
