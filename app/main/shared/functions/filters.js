import React from 'react';
import { Icon } from '@material-ui/core';
import moment from 'moment';

String.prototype.format = function () {
    var args = [].slice.call(arguments);
    return this.replace(/(\{\d+\})/g, function (a) {
        return args[+(a.substr(1, a.length - 2)) || 0];
    });
};
function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return "$ " + negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
};

class Filter {
    static svcDate = function (text, config) {
        if (text != null && text !== "") {
            return moment(text).format(config.defaultConfig.dateFormat);
        }
        return "";
    };
    static svcDateTime = function (text, config) {
        if (text != null && text !== "") {
            return moment(text).format(config.defaultConfig.dateTimeFormat);
        }
        return "";
    };
    static svcMoney = function (text) {
        if (isNaN(text)) {
            return 0;
        } else {
            return formatMoney(text);
        }
    };
    static svcNumber = function (text) {
        var v = parseInt(text);
        if (isNaN(v)) {
            return 0;
        } else {
            return v.toFixed(0);
        }
    };
    static svcImage = function (text, width, height) {
        var w = parseInt(width); if (isNaN(w)) { w = 52 };
        var h = parseInt(height); if (isNaN(h)) { h = 52 };
        var result = "";
        if (text != "") {
            result = "<img className='w-full block rounded' src='{0}' width='{1}' height='{2}' alt='' />".format(text, w, h);
        } else {
            result = "<img className='w-full block rounded' src='assets/images/ecommerce/product-image-placeholder.png' width='{0}' height='{1}' alt='' />".format(w, h);
        }
        return result;
    };
    static svcActive = function (text) {
        var ac = <Icon className='text-green text-20'>check_circle</Icon>;
        var iac = <Icon className='text-red text-20'>remove_circle</Icon>;
        var v = parseInt(text);
        if (v == 1) {
            return ac;
        }
        if (v == 0) {
            return iac;
        }
    };
    static svcOption = function (text, fieldName, optionUrl) {
        var result = "";
        // switch (typeof optionUrl) {
        //     case "string":
        //         var cacheKey = 'options_' + fieldName + '_' + optionUrl;
        //         var optcache = svcCache.get(cacheKey);
        //         if (typeof (optcache) != "undefined") {
        //             for (var k = 0; k < optcache.length; k++) {
        //                 if (optcache[k].Value == text) {
        //                     result = optcache[k].DisplayText;
        //                 }
        //             }
        //         }
        //         break;
        //     case "object":
        //         var cacheKey2 = 'options_' + fieldName + '_array';
        //         var optcache2 = svcCache.get(cacheKey2);
        //         if (typeof (optcache2) != "undefined") {
        //             for (var k = 0; k < optcache2.length; k++) {
        //                 if (optcache2[k].Value == text) {
        //                     result = optcache2[k].DisplayText;
        //                 }
        //             }
        //         }
        //         break;

        // }

        return result;
    };
}

export default Filter;