sap.ui.define([
	"./BaseObject",
	"./Skill"
], function (BaseObject,Skill) {
	"use strict";
	return BaseObject.extend("be.wl.PersonSkills.model.Person", {
		constructor: function (data) {
			BaseObject.call(this, data);
			this.Skills = [];
			if(data){
				this.Birthdate = data.Birthdate;
				this.setSkills(data.PersonHasSkills.results);
			}
		},
		SkillsChanged: function (oEvent) {
			if (!this.Skills.some((oSkill) => oSkill.isEmpty())) {
				this.addEmptySkill();
			}
		},
		addEmptySkill:function(){
			this.Skills.push(new Skill({SkillName:"",Score:""}));
		},
		setSkills:function(aSkills){
			this.Skills = aSkills.map((oSkill)=>new Skill(oSkill));
		},
		getSkills:function(){
			return this.Skills.map((oSkill)=>oSkill.getJSON());
		},
		getJSON: function () {
			return {
				Id: this.Id || "",
				Firstname: this.Firstname || "",
				Lastname: this.Lastname || "",
				Birthdate:this.Birthdate,
				Skills:this.getSkills()
			};
		}
	});
});