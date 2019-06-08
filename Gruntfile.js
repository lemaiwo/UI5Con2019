module.exports = function (grunt) {
	"use strict";
	grunt.loadNpmTasks("@sap/grunt-sapui5-bestpractice-build");
	grunt.config.merge({
		compatVersion: "edge"
	});
	grunt.registerTask("default", [
		"clean",
		"lint",
		"build"
	]);
};