const obj = {};
obj.appName = "Placed Order";
obj.baseRoute = "/order/placed-orders/";
obj.urlName = "Code";
obj.icon = "scatter_plot";
obj.addNewPermission = "placed_order_create";
obj.updatePermission = "placed_order_update";
obj.deletePermission = "placed_order_delete";

obj.defaultConfig = {
    datePickerFormat: "mm/dd/yyyy",
    dateFormat: "MM/DD/YYYY",
    dateTimeFormat: "MM/DD/YYYY HH:mm:ss",
    isoDateTimeFormat: "YYYY-MM-DDTHH:mm:ss.000",
    timeFormat: "HH:mm"
};

obj.DiscountType = [
    { Value: 1, DisplayText: "Percent" },
    { Value: 2, DisplayText: "Money" }
];

obj.OrderType = [
    { Value: 1, DisplayText: "Dine In" },
    { Value: 2, DisplayText: "To Go" },
    { Value: 3, DisplayText: "Delivery" }
];

obj.fields = [
    { field: "Id", label: "#", create: false, edit: true, list: false, type: "hidden", align: 'left', disablePadding: true, sort: false, required: true },
    { field: "RestaurantId", label: "Restaurant", view: 'Name', create: true, edit: true, list: true, type: 'select', option: '/option/getrestaurant', align: 'left', disablePadding: false, sort: true, required: true },
    { field: "BranchId", label: "Branch", view: 'Name', depend: 'RestaurantId', create: true, edit: true, list: true, type: 'select', option: '/option/getbranch', align: 'left', disablePadding: false, sort: true, required: true },
    { field: "OrderTypeId", label: "Order Type", view: 'Name', create: true, edit: true, list: true, type: 'select', option: obj.OrderType, align: 'left', disablePadding: false, sort: true },
    { field: "CustomerId", label: "Customer", view: 'Name', create: true, edit: true, list: false, type: 'select', option: '/option/getcustomer', align: 'left', disablePadding: false, sort: true },
    { field: "OrderChannelId", label: "Order Channel", view: 'Name', create: true, edit: true, list: true, type: 'select', option: '/option/getorderchannel', align: 'left', disablePadding: false, sort: true },
    { field: "TableId", label: "Table", view: 'Name', create: true, edit: true, list: true, type: 'select', option: '/option/gettable', align: 'left', disablePadding: false, sort: true },
    { field: "Code", label: "Code", create: false, edit: false, list: false, align: 'left', disablePadding: false, sort: true },
    { field: "CustomerName", label: "Customer", create: true, edit: true, list: false, align: 'left', disablePadding: false, sort: true },
    { field: "OrderTime", label: "Order Time", create: false, edit: false, list: true, type: 'datetime', align: 'left', disablePadding: false, sort: true },
    { field: "DeliveryTime", label: "Delivery Time", create: false, edit: false, list: false, type: 'datetime', align: 'left', disablePadding: false, sort: true },
    { field: "DeliveryAddress", label: "Delivery Address", create: true, edit: true, list: false, type: "textarea", align: 'right', disablePadding: false, sort: true },
    { field: "Price", label: "Price", create: false, edit: true, list: false, type: 'money', align: 'left', disablePadding: false, sort: true, readOnly: true },
    { field: "Tax", label: "Tax", create: true, edit: true, list: false, align: 'left', disablePadding: false, sort: true, readOnly: true },
    { field: "DiscountType", label: "Discount Type", view: 'Name', create: true, edit: true, list: false, type: 'number', type: 'select', option: obj.DiscountType, align: 'left', disablePadding: false, sort: true },
    { field: "Discount", label: "Discount", create: true, edit: true, list: false, type: 'number', align: 'left', disablePadding: false, sort: true },
    { field: "FinalPrice", label: "Total", create: false, edit: true, list: true, type: 'money', align: 'left', disablePadding: false, sort: true, readOnly: true },
    { field: "Description", label: "Description", create: true, edit: true, list: false, type: "textarea", align: 'right', disablePadding: false, sort: true },
    { field: "CreatedStaffId", label: "Waiter", view: 'Name', depend: 'RestaurantId', create: false, edit: false, list: false, type: 'select', option: '/option/getaccount', align: 'left', disablePadding: false, sort: true },
    { field: "CreatedDate", label: "Created Date", create: false, edit: false, list: false, type: 'datetime', align: 'left', disablePadding: false, sort: true },
    { field: "UpdatedStaffId", label: "Updated Staff", view: 'Name', depend: 'RestaurantId', create: false, edit: false, list: false, type: 'select', option: '/option/getaccount', align: 'left', disablePadding: false, sort: true },
    { field: "UpdatedDate", label: "Updated Date", create: false, edit: false, list: false, type: 'datetime', align: 'left', disablePadding: false, sort: true },
    { field: "OrderProcessId", label: "Order Process", view: 'Name', create: false, edit: false, list: true, type: 'select', option: '/option/getorderprocess', align: 'left', disablePadding: false, sort: true, readOnly: true },
    { field: "Status", label: "active", create: false, edit: false, list: true, type: "active", align: 'right', disablePadding: false, sort: true }

];

export default obj;