sap.ui.define([
	"../state/BaseState",
	"../model/Person",
	"../libs/observable-slim"
], function (BaseState, Person, obs) {
	"use strict";
	var PersonState = BaseState.extend("be.wl.PersonSkills.state.PersonState", {
		constructor: function (oService) {
			this.data = ObservableSlim.create({
				Person: new Person(),
				display: true
			}, true, (changes) => {
				console.log(JSON.stringify(changes));
				this.updateModel();
			});
			this.PersonService = oService;
			BaseState.call(this);

		},
		createPerson: function () {
			// this.Person = new Person();
			var oPerson = new Person();
			this.data.Person = new Person();
			this.data.Person.addEmptySkill();
			this.data.display = false;
			// this.updateModel();
		},
		getPerson: function (id) {
			return this.PersonService.getPerson(id).then((result) => {
				this.data.Person = new Person(result.data);
				this.data.display = true;
				// this.updateModel();
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