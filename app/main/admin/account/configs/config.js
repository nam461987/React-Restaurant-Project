const obj = {};
obj.appName = "Account";
obj.baseRoute = "/admin/accounts/";
obj.urlName = "UserName";
obj.icon = "perm_identity";
obj.addNewPermission = "admin_user_create";
obj.updatePermission = "admin_user_update";
obj.deletePermission = "admin_user_delete";
obj.resendActiveEmailPermission = "admin_user_resendactiveemail";

obj.defaultConfig = {
    datePickerFormat: "dd/mm/yyyy",
    dateFormat: "DD/MM/YYYY",
    dateTimeFormat: "DD/MM/YYYY HH:mm:ss",
    isoDateTimeFormat: "YYYY-MM-DDTHH:mm:ss.000",
    timeFormat: "HH:mm"
};

obj.ApiKey = "";
obj.currentTable = "";

obj.Gender = [
    { Value: 1, DisplayText: "Man" },
    { Value: 2, DisplayText: "Woman" }
];

obj.fields = [
    { field: "Id", label: "#", create: false, edit: true, list: false, type: "hidden", align: 'left', disablePadding: true, sort: false, readOnly: true },
    { field: "RestaurantId", label: "Restaurant", view: 'Name', create: true, edit: true, list: true, type: 'select', option: '/option/getrestaurant', align: 'left', disablePadding: false, sort: true, required: true },
    { field: "BranchId", label: "Branch", view: 'Name', depend: 'RestaurantId', create: true, edit: true, list: true, type: 'select', option: '/option/getbranch', align: 'left', disablePadding: false, sort: true, required: true },
    { field: "TypeId", label: "Group", view: 'Name', create: true, edit: true, list: true, type: 'select', option: '/option/getadmingroup', align: 'left', disablePadding: false, sort: true, required: true },
    { field: "UserName", label: "User", create: true, edit: true, list: true, type: 'username', align: 'left', disablePadding: false, sort: true, required: true, readOnly: true, autoFocus: true, placeHolder: 'At least 6 characters, no white space.' },
    { field: "PasswordHash", label: "Password", create: true, edit: true, list: false, type: 'password', align: 'left', disablePadding: false, sort: true, required: true, autoFocus: true, placeHolder: 'At least 8 characters, no white space.' },
    { field: "Email", label: "Email", create: true, edit: true, list: true, type: "email", align: 'left', disablePadding: false, sort: true, required: true, readOnly: true },
    { field: "Mobile", label: "Phone", create: true, edit: true, list: true, type: "phone", align: 'left', disablePadding: false, sort: true },
    { field: "Home", label: "Home", create: false, edit: false, list: false, align: 'left', disablePadding: false, sort: true },
    { field: "FullName", label: "Full Name", create: true, edit: true, list: true, align: 'left', disablePadding: false, sort: true },
    { field: "BirthDate", label: "Birthday", create: true, edit: true, list: true, type: "datetime", align: 'left', disablePadding: false, sort: true },
    { field: "StateId", label: "State", view: 'Name', create: true, edit: true, list: true, type: 'select', option: '/option/getstate', align: 'left', disablePadding: false, sort: true, required: true },
    { field: "CityId", label: "City", view: 'Name', depend: 'StateId', create: true, edit: true, list: true, type: 'select', option: '/option/getcity', align: 'left', disablePadding: false, sort: true, required: true },
    { field: "Zip", label: "Zip Code", create: true, edit: true, list: false, type: 'number', align: 'right', disablePadding: false, sort: true, required: true },
    { field: "Address", label: "Address", create: true, edit: true, list: false, align: 'right', disablePadding: false, sort: true },
    { field: "Gender", label: "Gender", create: true, edit: true, list: false, type: 'select', option: obj.Gender, align: 'right', disablePadding: false, sort: true },
    { field: "Description", label: "Description", create: true, edit: true, list: false, type: "textarea", align: 'right', disablePadding: false, sort: true },
    { field: "Active", label: "Active", create: false, edit: false, list: true, type: "active", align: 'center', disablePadding: false, sort: true },
    { field: "Status", label: "Delete", create: false, edit: false, list: true, type: "active", align: 'center', disablePadding: false, sort: true }
];

export default obj;