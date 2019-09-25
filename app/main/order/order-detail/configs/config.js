const obj = {};
obj.appName = "Placed Order Details";
obj.baseRoute = "/order/placed-orders/";
obj.urlName = "Code";
obj.icon = "scatter_plot";
obj.addNewPermission = "placed_order_detail_create";
obj.updatePermission = "placed_order_detail_update";
obj.deletePermission = "placed_order_detail_delete";

obj.defaultConfig = {
    datePickerFormat: "mm/dd/yyyy",
    dateFormat: "MM/DD/YYYY",
    dateTimeFormat: "MM/DD/YYYY HH:mm:ss",
    isoDateTimeFormat: "YYYY-MM-DDTHH:mm:ss.000",
    timeFormat: "HH:mm"
};

obj.fields = [
    { field: "Id", label: "#", create: false, edit: true, list: false, type: "hidden", align: 'left', disablePadding: true, sort: false, required: true },
    { field: "RestaurantId", label: "Restaurant", view: 'Name', create: true, edit: false, list: false, type: 'select', option: '/option/getrestaurant', align: 'left', disablePadding: false, sort: true, required: true },
    { field: "BranchId", label: "Branch", view: 'Name', depend: 'RestaurantId', create: true, edit: false, list: false, type: 'select', option: '/option/getbranch', align: 'left', disablePadding: false, sort: true, required: true },
    { field: "PlacedOrderId", label: "Order", view: 'Code', create: false, edit: false, list: true, type: 'select', align: 'left', disablePadding: false, sort: true, required: true, readOnly: true },
    { field: "OfferId", label: "Offer Name", view: 'Name', create: true, edit: true, list: true, type: 'select', option: '/option/getmenu', align: 'left', disablePadding: false, sort: true },
    { field: "MenuId", label: "Menu Name", view: 'Name', create: true, edit: true, list: true, type: 'select', option: '/option/getmenu', align: 'left', disablePadding: false, sort: true },
    { field: "SizeId", label: "Size", view: 'Name', create: true, edit: true, list: true, type: 'select', option: '/option/getsize', align: 'left', disablePadding: false, sort: true },
    { field: "Quantity", label: "Quantity", create: true, edit: true, list: true, align: 'left', disablePadding: false, sort: true },
    { field: "MenuPrice", label: "Price", create: true, edit: true, list: true, type: 'money', align: 'left', disablePadding: false, sort: true },
    { field: "Price", label: "Total", create: true, edit: true, list: true, type: 'money', align: 'left', disablePadding: false, sort: true },
    { field: "IsFinish", label: "Finish", create: false, edit: false, list: true, type: "active", align: 'right', disablePadding: false, sort: true },
    { field: "Description", label: "Description", create: true, edit: true, list: true, type: "textarea", align: 'right', disablePadding: false, sort: true },
    { field: "Status", label: "active", create: false, edit: false, list: true, type: "active", align: 'right', disablePadding: false, sort: true }

];

export default obj;