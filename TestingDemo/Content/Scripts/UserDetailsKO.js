var model;

function UserViewModel() {
    var self = this;

    self.error = ko.observable('');
    self.showDobErrorMessage = ko.observable(false);

    self.firstName = ko.observable('');
    self.surname = ko.observable('');
    self.dobDay = ko.observable('');
    self.dobMonth = ko.observable('');
    self.dobYear = ko.observable('');
    self.dateOfBirth = ko.observable('');
    self.age = ko.observable('');
    self.roleType = ko.observable('');
    self.dobIsValid = ko.observable(false);


    // set available options in dob dropdowns
    self.availableDays = [{ display: "Day", value: 0 }];

    self.availableMonths = [
        { display: "Month", value: 0 },
        { display: "January", value: 1 },
        { display: "February", value: 2 },
        { display: "March", value: 3 },
        { display: "April", value: 4 },
        { display: "May", value: 5 },
        { display: "June", value: 6 },
        { display: "July", value: 7 },
        { display: "August", value: 8 },
        { display: "September", value: 9 },
        { display: "October", value: 10 },
        { display: "November", value: 11 },
        { display: "December", value: 12 }
    ];

    self.availableYears = [{ display: "Year", value: 0 }];
    self.init = function () {
        // initialise days & years
        var currentYear = new Date().getFullYear();
        for (var i = 1; i < 32; i++) {
            self.availableDays.push({ display: i, value: i });
        }
        for (i = currentYear; i >= currentYear - 100; i--) {
            self.availableYears.push({ display: i, value: i });
        }
    }();

    self.isValidDate = function () {
        if (self.dobDay() == 29 && self.dobMonth() == 2) {
            return self.isLeapYear();
        }
        else if (self.dobDay() == 30 && self.dobMonth() == 2) {
            self.error(invalidError);
            return false;
        }
        else if (self.dobDay() == 31 && ((self.dobMonth() == 2) || (self.dobMonth() == 4) || (self.dobMonth() == 6) || (self.dobMonth() == 9) || (self.dobMonth() == 11))) {
            self.error(invalidError);
            return false;
        }
        else {
            self.dateOfBirth(getDob(model.dobYear(), model.dobMonth(), model.dobDay()));
            self.age (calculateAge(self.dobYear(), self.dobMonth(), self.dobDay()));
            return true;
        }
    };

    self.isDobFieldComplete = function() {
            return (self.dobDay() > 0 && self.dobMonth() > 0 && self.dobYear() > 0);
    };

    self.firstNameIsEmpty = ko.computed(function () {
        return self.firstName() == '';
    });

    self.firstNameIsValid = ko.computed(function () {
        if (self.firstName() != undefined && self.firstName() != '' && self.firstName().match(/^([a-zA-Z\s-']{2,15})$/g) != null) {
            return true;
        } else {
            return false;
        };
    });

    self.surnameIsEmpty = ko.computed(function () {
        return self.surname() == '';
    });

    self.surnameIsValid = ko.computed(function () {
        return (self.surname() != undefined && self.surname() != '' && self.surname().match(/^([a-zA-Z\s-']{2,15})$/g) != null);
    });

    self.roleTypeIsValid = ko.computed(function () {
        if (self.roleType() !== '') {
            return true;
        }
        return false;
    });
}

ko.bindingHandlers.koValidation = {
    update: function (element, valueAccessor) {
        $(element).removeClass('valid').removeClass('invalid').removeClass('incomplete');

        isPageValid();
        ko.bindingHandlers.css.update(element, valueAccessor);
    }
};

ko.bindingHandlers.koValidationDob = {
    update: function (element, valueAccessor, allBindingsAcessor, viewModel) {
        $(element).removeClass('valid').removeClass('invalid').removeClass('incomplete');
        var modelToUse = (viewModel.constructor == UserViewModel) ? model : viewModel;

        var dobState = dobIsValid(modelToUse);

        if (dobState == "incomplete")
            return;

        if (isPageValid()) {
            $('#add-user-button').removeClass('disabled');
        } else {
            $('#add-user-button').addClass('disabled');
        };

        $(element).addClass(dobState);
    }
};

function isPageValid() {
    return (model.firstNameIsValid() && model.surnameIsValid() && model.dobIsValid() && model.roleTypeIsValid());
};

function dobIsValid() {
    if (model.isDobFieldComplete()) {
        if (!model.isValidDate()) {
            model.showDobErrorMessage(true);
            model.error(invalidError);
            model.dobIsValid(false);
            return "invalid";
        } else {
            model.showDobErrorMessage(false);
            model.error("a-ok!");
            model.dobIsValid(true);
            return "valid";
        }
    }
};

function calculateAge(year, month, day) {
    var today = new Date();
    var birthDate = new Date(year, month - 1, day, 0, 0, 0, 0);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function getDob(year, month, day) {
    return new Date(year, month -1, day).toDateString();
}

var invalidError = 'You seem to have entered an invalid date of birth for this Year. Please check the date of birth you have entered.';

model = new UserViewModel();

ko.applyBindings(model);
