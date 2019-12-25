sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/model/json/JSONModel"
], function (Object, JSONModel) {
	"use strict";
	return Object.extend("be.wl.PersonSkills.model.BaseObject", {
		constructor: function (data) {
			this.copyValues(data);
		},
		copyFieldsToObject: function (aFields) {
			return this.copyFields(this, {}, aFields);
		},
		copyFieldsToThis: function (oFrom, aFields) {
			return this.copyFields(oFrom, this, aFields);
		},
		copyFields: function (oFrom, oTo, aFields) {
			for (var prop in oFrom) {
				if (aFields.find((field) => field === prop)) {
					oTo[prop] = oFrom[prop];
				}
			}
			return oTo;
		},
		initDirtyCheck: function () {
			this.isDirty = false;
			this.enableDirtyFlag();
			this.updateModel();
		},
		disableDirtyFlag: function () {
			this.setDirtyFlag(false);
		},
		enableDirtyFlag: function () {
			this.setDirtyFlag(this.isDirty);
		},
		setDirtyFlag: function (bIsDirty) {
			sap && sap.ushell && sap.ushell.Container && sap.ushell.Container.setDirtyFlag(bIsDirty);
		},
		copyValues: function (data) {
			if (data) {
				for (var field in data) {
					switch (typeof (data[field])) {
					case "object":
						if (data[field] && data[field]["results"]) {
							this[field] = data[field]["results"];
						}
						break;
					default:
						this[field] = data[field];
					}
				}
			}
		},
		getData: function () {
			var req = jQuery.extend({}, this);
			delete req["model"];
			return req;
		},
		fnMap: function (oObject) {
			var obj = {};
			for (var prop in oObject) {
				if (oObject.hasOwnProperty(prop) && typeof (oObject[prop]) !== "object") {
					obj[prop] = oObject[prop];
				}
			}
			return obj;
		}
	});
});