sap.ui.define([
	"./CoreService",
	"sap/ui/model/Sorter"
], function (CoreService, Sorter) {
	"use strict";

	var PersonService = CoreService.extend("be.wl.PersonSkills.service.PersonService", {
		constructor: function (model) {
			CoreService.call(this, model);
		},
		getPerson: function (id) {
			var sObjectPath = this.model.createKey("/Persons", {
				Id: id
			});
			var mParameters = {
				urlParameters: {
					$expand: "PersonHasSkills"
				}
			};
			return this.odata(sObjectPath).get(mParameters);
		}
	});
	return PersonService;
});