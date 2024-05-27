/*global QUnit*/

sap.ui.define([
	"pie/controller/Pie.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Pie Controller");

	QUnit.test("I should test the Pie controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
