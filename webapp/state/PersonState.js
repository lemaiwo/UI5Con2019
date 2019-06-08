sap.ui.define([
	"../model/BaseObject",
	"../model/Person"
], function (BaseObject, Person) {
	"use strict";
	var PersonState = BaseObject.extend("be.wl.PersonSkills.state.PersonState", {
		constructor: function (oService) {
			BaseObject.call(this, {
				isState: true
			});
			this.PersonService = oService;
			this.Person = new Person();
			this.display = true;
		},
		createPerson: function () {
			this.Person = new Person();
			this.Person.addEmptySkill();
			this.display = false;
			this.updateModel();
		},
		getPerson: function (id) {
			return this.PersonService.getPerson(id).then((result) => {
				this.Person = new Person(result.data);
				this.display = true;
				this.updateModel();
				return this.Person;
			});
		}
	});
	return PersonState;
});