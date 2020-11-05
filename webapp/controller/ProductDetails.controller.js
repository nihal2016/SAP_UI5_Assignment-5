sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/core/Fragment"
], function (Controller, UIComponent, Fragment) {
	"use strict";

	return Controller.extend("com.yash.assignment5.controller.ProductDetails", {

		onInit: function () {
			UIComponent.getRouterFor(this).getRoute("RouteProductDetails").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function (oEvent) {
			this.getView().bindElement("/" + oEvent.getParameter("arguments").data + "/Product");
		},
		onBackButtonPress: function () {
			window.history.go(-1);
		},
		openPopOverCategoryInfo: function (oEvent) {
			var oButton = oEvent.getSource();
			var path = oButton.getBindingContext().sPath + "/Category";

			Fragment.load({
				name: "com.yash.assignment5.fragments.CategoryInfoPopover",
				controller: this
			}).then(function (pPopover) {
				this._oPopover = pPopover;
				this.getView().addDependent(this._oPopover);
				this._oPopover.bindElement(path);
				this._oPopover.openBy(oButton);
			}.bind(this));
		},
		openPopOverSupplierInfo: function (oEvent) {
			var oButton = oEvent.getSource();
			var path = oButton.getBindingContext().sPath + "/Supplier";

			Fragment.load({
				name: "com.yash.assignment5.fragments.SupplierInfoPopover",
				controller: this
			}).then(function (pPopover) {
				this._oPopover = pPopover;
				this.getView().addDependent(this._oPopover);
				this._oPopover.bindElement(path);
				this._oPopover.openBy(oButton);
			}.bind(this));
		},
		handleActionPress: function () {
			this._oPopover.close();
		}

	});

});