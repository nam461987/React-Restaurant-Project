const obj = {};
obj.appName = "Branch";
obj.baseRoute = "/categories/branchs/";
obj.urlName = "Name";
obj.icon = "branch";
obj.addNewPermission = "category_restaurant_branch_create";
obj.updatePermission = "category_restaurant_branch_update";
obj.deletePermission = "category_restaurant_branch_delete";

obj.defaultConfig = {
    datePickerFormat: "dd/mm/yyyy",
    dateFormat: "DD/MM/YYYY",
    dateTimeFormat: "DD/MM/YYYY HH:mm:ss",
    isoDateTimeFormat: "YYYY-MM-DDTHH:mm:ss.000",
    timeFormat: "HH:mm"
};

obj.ApiKey = "";
obj.currentTable = "";

obj.fields = [
    { field: "Id", label: "#", create: false, edit: true, list: false, type: "hidden", align: 'left', disablePadding: true, sort: false, required: true },
    { field: "RestaurantId", label: "Restaurant", view: 'Name', create: true, edit: true, list: true, type: 'select', option: '/option/getrestaurant', align: 'left', disablePadding: false, sort: true, required: true },
    { field: "Name", label: "Name", create: true, edit: true, list: true, align: 'left', disablePadding: false, sort: true, required: true },
    { field: "StateId", label: "State", view: 'Name', create: true, edit: true, list: true, type: 'select', option: '/option/getstate', align: 'left', disablePadding: false, sort: true, required: true },
    { field: "CityId", label: "City", view: 'Name', depend: 'StateId', create: true, edit: true, list: true, type: 'select', option: '/option/getcity', align: 'left', disablePadding: false, sort: true, required: true },
    { field: "Zip", label: "Zip Code", create: true, edit: true, list: false, type: 'number', align: 'right', disablePadding: false, sort: true, required: true },
    { field: "Address", label: "Address", create: true, edit: true, list: true, align: 'right', disablePadding: false, sort: true },
    { field: "Phone", label: "Phone", create: true, edit: true, list: true, type: "phone", align: 'left', disablePadding: false, sort: true },
    { field: "OpenTime", label: "Open Time", create: true, edit: true, list: true, type: "time", align: 'right', disablePadding: false, sort: true },
    { field: "CloseTime", label: "Close Time", create: true, edit: true, list: true, type: "time", align: 'right', disablePadding: false, sort: true },
    { field: "AllDay", label: "All Day", create: true, edit: true, list: true, type: "checkbox", align: 'right', disablePadding: false, sort: true },
    { field: "Status", label: "active", create: false, edit: false, list: true, type: "active", align: 'right', disablePadding: false, sort: true }
];

export default obj;