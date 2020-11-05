sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/routing/History"
], function (Controller, UIComponent, Filter, FilterOperator, History) {
	"use strict";

	return Controller.extend("com.yash.assignment5.controller.OrderDetails", {

		onInit: function () {
			UIComponent.getRouterFor(this).getRoute("RouteOrderDetails").attachMatched(this._onRouteMatched, this);
		},
		goToProductDetails: function (oEvent) {
			UIComponent.getRouterFor(this).navTo("RouteProductDetails", {
				data: oEvent.getSource().getBindingContextPath().substr(1)
			});

		},
		_onRouteMatched: function (oEvent) {
			this.getView().bindElement("/" + oEvent.getParameter("arguments").data);
		},
		onProductIdSelected: function (oEvent) {
			if (oEvent.getSource().getValue()) {
				this.getView().byId("orderDetailsTable").getBinding("items").filter(new Filter({
					filters: [
						new Filter({
							path: "ProductID",
							operator: FilterOperator.EQ,
							value1: parseInt(oEvent.getSource().getValue(), 10)
						})
					]
				}));
			}
		},
		onBackButtonPress: function () {
			window.history.go(-1);
		}

	});

});