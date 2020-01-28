const obj = {};
obj.appName = "Menu Define";
obj.baseRoute = "/categories/menu-defines/";
obj.urlName = "IngredientIdName";
obj.icon = "format_size";
obj.addNewPermission = "menu_definition_create";
obj.updatePermission = "menu_definition_update";
obj.deletePermission = "menu_definition_delete";

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
    { field: "MenuId", label: "Menu", create: true, edit: true, list: false, type: 'hidden', align: 'left', disablePadding: false, sort: true, readOnly: true },
    { field: "SizeId", label: "Size", create: true, edit: true, list: false, type: 'hidden', align: 'left', disablePadding: false, sort: true, readOnly: true },
    { field: "MenuId", label: "Menu", view: 'Name', create: false, edit: false, list: true, type: 'select', option: '/option/getmenu', align: 'left', disablePadding: false, sort: true, required: true, convertToInputInEdit: true, readOnly: true },
    { field: "SizeId", label: "Size", view: 'Name', create: false, edit: false, list: true, type: 'select', option: '/option/getsize', align: 'left', disablePadding: false, sort: true, required: true, convertToInputInEdit: true, readOnly: true },
    // { field: "IngredientId", label: "Ingredient", view: 'Name', create: true, edit: false, list: false, type: 'select', option: '/option/getingredient', align: 'left', disablePadding: false, sort: true, required: true, convertToInputInEdit: true, readOnly: true },
    { field: "IngredientId", label: "Ingredient", view: 'Name', create: true, edit: false, list: true, type: 'select', option: '/option/getingredientwithunit', align: 'left', disablePadding: false, sort: true, required: true, convertToInputInEdit: true, readOnly: true },
    { field: "Quantity", label: "Quantity", create: true, edit: true, list: true, align: 'left', disablePadding: false, sort: true, required: true },
    { field: "IngredientIdUnitIdName", label: "Unit", create: false, edit: false, list: true, type: 'text', align: 'left', disablePadding: false, sort: true, required: true, readOnly: true },
    { field: "Description", label: "Description", create: true, edit: true, list: true, type: "textarea", align: 'right', disablePadding: false, sort: true },
    { field: "Status", label: "active", create: false, edit: false, list: true, type: "active", align: 'right', disablePadding: false, sort: true }
];

export default obj;