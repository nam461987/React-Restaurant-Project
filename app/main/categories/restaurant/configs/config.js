const obj = {};
obj.appName = "Restaurant";
obj.baseRoute = "/categories/restaurants/";
obj.urlName = "Name";
obj.icon = "restaurant";
obj.addNewPermission = "category_restaurant_create";
obj.updatePermission = "category_restaurant_update";
obj.deletePermission = "category_restaurant_delete";

obj.defaultConfig = {
    datePickerFormat: "dd/mm/yyyy",
    dateFormat: "DD/MM/YYYY",
    dateTimeFormat: "DD/MM/YYYY HH:mm:ss",
    isoDateTimeFormat: "YYYY-MM-DDTHH:mm:ss.000",
    timeFormat: "HH:mm"
};

obj.ApiKey = "";
obj.currentTable = "";

obj.RestaurantType = [
    { Value: 1, DisplayText: "Restaurant" },
    { Value: 2, DisplayText: "Online" }
];

obj.fields = [
    { field: "Id", label: "#", create: false, edit: true, list: false, type: "hidden", align: 'left', disablePadding: true, sort: false, required: true },
    { field: "TypeId", label: "Type", view: 'Name', create: true, edit: true, list: true, type: 'select', option: obj.RestaurantType, align: 'left', disablePadding: false, sort: true, required: true },
    { field: "Name", label: "Name", create: true, edit: true, list: true, align: 'left', disablePadding: false, sort: true, required: true },
    { field: "Email", label: "Email", create: true, edit: true, list: true, type: "email", align: 'left', disablePadding: false, sort: true, required: true, readOnly: true },
    { field: "Phone", label: "Phone", create: true, edit: true, list: true, type: "phone", align: 'left', disablePadding: false, sort: true },
    { field: "StateId", label: "State", view: 'Name', create: true, edit: true, list: true, type: 'select', option: '/option/getstate', align: 'left', disablePadding: false, sort: true, required: true },
    { field: "CityId", label: "City", view: 'Name', depend: 'StateId', create: true, edit: true, list: true, type: 'select', option: '/option/getcity', align: 'left', disablePadding: false, sort: true, required: true },
    { field: "Zip", label: "Zip Code", create: true, edit: true, list: false, type: 'number', align: 'right', disablePadding: false, sort: true, required: true },
    { field: "Address", label: "Address", create: true, edit: true, list: true, align: 'right', disablePadding: false, sort: true },
    { field: "Description", label: "Description", create: true, edit: true, list: false, type: "textarea", align: 'right', disablePadding: false, sort: true },
    { field: "Status", label: "active", create: false, edit: false, list: true, type: "active", align: 'right', disablePadding: false, sort: true }
];

export default obj;