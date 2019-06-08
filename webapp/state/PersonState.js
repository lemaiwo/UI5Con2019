sap.ui.define([
	"../model/BaseObject",
	"../model/Person",
	"../libs/observable-slim"
], function (BaseObject, Person, obs) {
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
			// this.Person = new Person();
			var oPerson = new Person();
			this.Person = ObservableSlim.create(oPerson, true,  (changes)=>{
				console.log(JSON.stringify(changes));
				this.updateModel();
			});
			this.Person.addEmptySkill();
			this.display = false;
			// this.updateModel();
		},
		getPerson: function (id) {
			return this.PersonService.getPerson(id).then((result) => {
				this.Person = new Person(result.data);
				this.display = true;
				this.updateModel();
				return this.Person;
			});
		},
		newPerson: function () {
			return this.PersonService.createPerson(this.Person).then((result) => result.data.Id);
		},
		deletePersonSkill: function (iIndex) {
			this.Person.deleteSkill(iIndex);
			// this.updateModel();
		}
	});
	return PersonState;
});