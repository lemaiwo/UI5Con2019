sap.ui.define([
	"../model/BaseObject",
	"../model/Person",
	"../libs/observable-slim"
], function (BaseObject, Person, obs) {
	"use strict";
	var PersonState = BaseObject.extend("be.wl.PersonSkills.state.PersonState", {
		constructor: function (oService) {
			this.data = {
				Person : new Person(),
				display : true
			};
			this.PersonService = oService;
			BaseObject.call(this, {
				isState: true
			});

		},
		createPerson: function () {
			// this.Person = new Person();
			var oPerson = new Person();
			this.data.Person = ObservableSlim.create(oPerson, true,  (changes)=>{
				console.log(JSON.stringify(changes));
				this.updateModel();
			});
			this.data.Person.addEmptySkill();
			this.data.display = false;
			// this.updateModel();
		},
		getPerson: function (id) {
			return this.PersonService.getPerson(id).then((result) => {
				this.data.Person = new Person(result.data);
				this.data.display = true;
				this.updateModel();
				return this.data.Person;
			});
		},
		newPerson: function () {
			return this.PersonService.createPerson(this.data.Person).then((result) => result.data.Id);
		},
		deletePersonSkill: function (iIndex) {
			this.data.Person.deleteSkill(iIndex);
			// this.updateModel();
		}
	});
	return PersonState;
});