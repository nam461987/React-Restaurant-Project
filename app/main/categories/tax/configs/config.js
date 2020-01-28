const obj = {};
obj.appName = "Tax";
obj.baseRoute = "/categories/taxes/";
obj.urlName = "Name";
obj.icon = "scatter_plot";
obj.addNewPermission = "category_tax_create";
obj.updatePermission = "category_tax_update";
obj.deletePermission = "category_tax_delete";

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
    { field: "Percentage", label: "Tax (%)", create: true, edit: true, list: true, type: "number", align: 'right', disablePadding: false, sort: true, required: true },
    { field: "Status", label: "active", create: false, edit: false, list: true, type: "active", align: 'right', disablePadding: false, sort: true }
];

export default obj;