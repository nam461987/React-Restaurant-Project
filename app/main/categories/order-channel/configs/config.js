const obj = {};
obj.appName = "Order Channel";
obj.baseRoute = "/categories/order-channels/";
obj.urlName = "Name";
obj.icon = "phonelink";
obj.addNewPermission = "category_order_channel_create";
obj.updatePermission = "category_order_channel_update";
obj.deletePermission = "category_order_channel_delete";

obj.defaultConfig = {
    datePickerFormat: "dd/mm/yyyy",
    dateFormat: "DD/MM/YYYY",
    dateTimeFormat: "DD/MM/YYYY HH:mm:ss",
    isoDateTimeFormat: "YYYY-MM-DDTHH:mm:ss.000",
    timeFormat: "HH:mm"
};

obj.fields = [
    { field: "Id", label: "#", create: false, edit: true, list: false, type: "hidden", align: 'left', disablePadding: true, sort: false, required: true },
    { field: "RestaurantId", label: "Restaurant", view: 'Name', create: true, edit: true, list: true, type: 'select', option: '/option/getrestaurant', align: 'left', disablePadding: false, sort: true, required: true },
    { field: "Name", label: "Name", create: true, edit: true, list: true, align: 'left', disablePadding: false, sort: true, required: true, autoFocus: true },
    { field: "OpenTime", label: "Open Time", create: true, edit: true, list: true, type: "time", align: 'right', disablePadding: false, sort: true },
    { field: "CloseTime", label: "Close Time", create: true, edit: true, list: true, type: "time", align: 'right', disablePadding: false, sort: true },
    { field: "AllDay", label: "All Day", create: true, edit: true, list: true, type: "checkbox", align: 'right', disablePadding: false, sort: true },
    { field: "Description", label: "Description", create: true, edit: true, list: true, type: "textarea", align: 'right', disablePadding: false, sort: true },
    { field: "Status", label: "active", create: false, edit: false, list: true, type: "active", align: 'right', disablePadding: false, sort: true }
];

export default obj;