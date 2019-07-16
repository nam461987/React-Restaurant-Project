const obj = {};
obj.appName = "Price";
obj.baseRoute = "/categories/prices/";
obj.urlName = "SizeIdName";
obj.icon = "attach_money";
obj.addNewPermission = "category_menu_price_create";
obj.updatePermission = "category_menu_price_update";
obj.deletePermission = "category_menu_price_delete";

obj.defaultConfig = {
    datePickerFormat: "dd/mm/yyyy",
    dateFormat: "DD/MM/YYYY",
    dateTimeFormat: "DD/MM/YYYY HH:mm:ss",
    isoDateTimeFormat: "YYYY-MM-DDTHH:mm:ss.000",
    timeFormat: "HH:mm"
};

obj.fields = [
    { field: "Id", label: "#", create: false, edit: true, list: false, type: "hidden", align: 'left', disablePadding: true, sort: false, required: true },
    { field: "SizeId", label: "Size", depend: 'RestaurantId', view: 'Name', create: true, edit: true, list: true, type: 'select', option: '/option/getsize', align: 'left', disablePadding: false, sort: true, required: true },
    { field: "Price", label: "Price", type: 'money', create: true, edit: true, list: true, align: 'left', disablePadding: false, sort: true, required: true, autoFocus: true },
    { field: "Status", label: "active", create: false, edit: false, list: true, type: "active", align: 'right', disablePadding: false, sort: true }
];

export default obj;