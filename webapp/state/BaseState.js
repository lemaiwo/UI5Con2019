sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/model/json/JSONModel"
], function (Object, JSONModel) {
	"use strict";
	return Object.extend("be.wl.PersonSkills.state.BaseState", {
		constructor: function (data) {
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
		}
	});
});