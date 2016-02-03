$(function () {
    UserDetails
        .initCommonComponents();
});

var UserDetails = UserDetails || {};

UserDetails.initCommonComponents = function () {
    this
        .AddNewUser();
    return this;
};

UserDetails.AddNewUser = function () {
    $('#add-user-button').click(function () {
            $(this).closest('form').submit();
    });
    return this;
};

