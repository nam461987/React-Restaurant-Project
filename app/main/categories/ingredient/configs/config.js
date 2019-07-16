const obj = {};
obj.appName = "Ingredient";
obj.baseRoute = "/categories/ingredients/";
obj.urlName = "Name";
obj.icon = "scatter_plot";
obj.addNewPermission = "category_ingredient_create";
obj.updatePermission = "category_ingredient_update";
obj.deletePermission = "category_ingredient_delete";

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
    { field: "Name", label: "Name", create: true, edit: true, list: true, align: 'left', disablePadding: false, sort: true, required: true, autoFocus: true },
    { field: "UnitId", label: "Unit", depend: 'RestaurantId', view: 'Name', create: true, edit: true, list: true, type: 'select', option: '/option/getunit', align: 'left', disablePadding: false, sort: true, required: true },
    { field: "Description", label: "Description", create: true, edit: true, list: true, type: "textarea", align: 'right', disablePadding: false, sort: true },
    { field: "Status", label: "active", create: false, edit: false, list: true, type: "active", align: 'right', disablePadding: false, sort: true }
];

export default obj;