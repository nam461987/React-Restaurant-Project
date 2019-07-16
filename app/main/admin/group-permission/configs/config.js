const obj = {};
obj.appName = "Group Permission";
obj.baseRoute = "/admin/grouppermission/";
obj.urlName = "UserName";
obj.icon = "playlist_add_check";

obj.fields = [
    { field: "Id", label: "#", create: false, edit: true, list: false, type: "hidden", align: 'left', disablePadding: true, sort: false, readOnly: true },
];

export default obj;