sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/model/json/JSONModel"
], function (Object, JSONModel) {
	"use strict";
	return Object.extend("be.wl.PersonSkills.model.BaseObject", {
		constructor: function (data) {
			this.copyValues(data);

			if (this.isState) {
				this.initDirtyCheck();
				this.getModel().attachPropertyChange((oProperty) => {
					// this.isDirty = this.isDirtyCheck();
					// sap && sap.ushell && sap.ushell.Container && sap.ushell.Container.setDirtyFlag(this.isDirty);
					// this["update" + oProperty.getParameter("path")] && this["update" + oProperty.getParameter("path").substr(1)]();
					var fChangeFunction = this.getChangeFunction(oProperty.getParameter("path"));
					this.callChangeFunction(fChangeFunction, oProperty);
					if (oProperty.getParameter("context")) {
						fChangeFunction = this.getChangeFunction(oProperty.getParameter("context").getPath() + "/" + oProperty.getParameter("path"));
						this.callChangeFunction(fChangeFunction, oProperty.getParameter("context").getObject(), oProperty);
						//call parent
						var sPath = oProperty.getParameter("context").getPath();
						var sParent = sPath.split("/")[sPath.split("/").length - 1];
						if (!isNaN(parseInt(sParent))) { //in case of integer it's probably an array and we need to go one level up
							sPath = sPath.split("/").slice(0, sPath.split("/").length - 1).join("/");
						}
						var sSourcePath = sPath.split("/").slice(0, sPath.split("/").length - 1).join("/");
						var oSource = (sSourcePath && oProperty.getParameter("context").getModel().getProperty(sSourcePath));
						fChangeFunction = this.getChangeFunction(sPath);
						this.callChangeFunction(fChangeFunction, (oSource || oProperty.getParameter("context").getObject()), oProperty);

					}
				}, this);
			}
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
		getChangeFunction: function (sPath) {
			sPath = sPath.substr(0, 1) === "/" ? sPath.substr(1) : sPath;
			return sPath.split("/").reduce(function (prev,
				curr,
				idx, array) {
				if (idx === array.length - 1) {
					return prev[curr + "Changed"];
				}
				return curr && curr.length > 0 && prev ? prev[curr] : prev;
			}, this.data);
		},
		callChangeFunction: function (fChangeFunction, scope, args) {
			fChangeFunction && fChangeFunction.apply(scope, args);
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
		getModel: function () {
			if (!this.model) {
				this.model = new JSONModel(this.data, true);
				//this.model.setData(this);
			}
			return this.model;
		},
		updateModel: function (bHardRefresh) {
			if (this.model) {
				this.model.refresh(bHardRefresh ? true : false);
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