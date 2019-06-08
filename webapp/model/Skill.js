sap.ui.define([
	"./BaseObject"
], function (BaseObject) {
	"use strict";
	return BaseObject.extend("be.wl.PersonSkills.model.Skill", {
		constructor: function (data) {
			BaseObject.call(this, data);
			this.Editable = true;
			this.Deletable = false;
		},
		SkillNameChanged: function (oEvent) {
			this.changeEditable();
		},
		ScoreChanged: function (oEvent) {
			this.changeEditable();
		},
		changeEditable: function () {
			this.Editable = !(this.SkillName && this.Score);
			this.Deletable = !!(this.SkillName || this.Score);
		},
		isEmpty:function(){
			return this.SkillName === "" || this.Score === 0;
		},
		isNotEmpty:function(){
			return this.SkillName !== "" && this.Score >= 0;
		},
		getJSON: function () {
			return {
				Id: this.Id || 0,
				PersonId: this.PersonId || 0,
				SkillName: this.SkillName || "",
				Score: this.Score || 0
			};
		}
	});
});