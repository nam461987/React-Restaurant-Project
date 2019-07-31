const obj = {};
obj.appName = "Order Process";
obj.baseRoute = "/categories/order-processes/";
obj.urlName = "Name";
obj.icon = "scatter_plot";
obj.addNewPermission = "order_process_create";
obj.updatePermission = "order_process_update";
obj.deletePermission = "order_process_delete";

obj.defaultConfig = {
    datePickerFormat: "dd/mm/yyyy",
    dateFormat: "DD/MM/YYYY",
    dateTimeFormat: "DD/MM/YYYY HH:mm:ss",
    isoDateTimeFormat: "YYYY-MM-DDTHH:mm:ss.000",
    timeFormat: "HH:mm"
};

obj.fields = [
    { field: "Id", label: "#", create: false, edit: false, list: true, align: 'left', disablePadding: true, sort: false, required: true },
    { field: "Name", label: "Name", create: true, edit: true, list: true, align: 'left', disablePadding: false, sort: true, required: true, autoFocus: true },
    { field: "Color", label: "Color", create: true, edit: true, list: true, align: 'left', disablePadding: false, sort: true, required: true },
    { field: "Description", label: "Description", create: true, edit: true, list: true, type: "textarea", align: 'right', disablePadding: false, sort: true },
    { field: "Status", label: "active", create: false, edit: false, list: true, type: "active", align: 'right', disablePadding: false, sort: true }
];

export default obj;