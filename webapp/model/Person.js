sap.ui.define([
	"./BaseObject",
	"./Skill"
], function (BaseObject, Skill) {
	"use strict";
	return BaseObject.extend("be.wl.PersonSkills.model.Person", {
		constructor: function (data) {
			BaseObject.call(this, data);
			this.Skills = [];
			if (data) {
				this.Birthdate = data.Birthdate;
				this.setSkills(data.PersonHasSkills.results);
			}

			Object.defineProperty(this, "Total", {
				get: () => {
					return (this.getSkills().reduce((iTotal, oSkill) => {
						iTotal += oSkill.Score
						return iTotal;
					}, 0) / this.getSkills().length )|| 0;
				}
			});
		},
		SkillsChanged: function (oEvent) {
			if (!this.Skills.some((oSkill) => oSkill.isEmpty())) {
				this.addEmptySkill();
			}
		},
		deleteSkill: function (iIndex) {
			this.Skills.splice(iIndex, 1);
		},
		addEmptySkill: function () {
			this.Skills.push(new Skill({
				SkillName: "",
				Score: ""
			}));
		},
		setSkills: function (aSkills) {
			this.Skills = aSkills.map((oSkill) => new Skill(oSkill));
		},
		getSkills: function () {
			return this.Skills.filter((oSkill) => oSkill.isNotEmpty()).map((oSkill) => oSkill.getJSON());
		},
		getJSON: function () {
			return {
				Id: this.Id || 0,
				Firstname: this.Firstname || "",
				Lastname: this.Lastname || "",
				Company: "",
				Birthdate: this.Birthdate || "",
				PersonHasSkills: this.getSkills()
			};
		}
	});
});