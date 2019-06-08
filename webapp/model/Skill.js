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
			return this.SkillName === "" || this.Score === "";
		},
		getJSON: function () {
			return {
				Id: this.Id || "",
				PersonId: this.PersonId || "",
				SkillName: this.SkillName || "",
				Score: this.Score || "0"
			};
		}
	});
});