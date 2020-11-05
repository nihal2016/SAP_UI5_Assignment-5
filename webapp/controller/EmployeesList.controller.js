sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"com/yash/assignment5/model/formatter"
], function (Controller, UIComponent, Filter, FilterOperator, formatter) {
	"use strict";

	return Controller.extend("com.yash.assignment5.controller.EmployeesList", {

		formatter: formatter,

		onInit: function () {},

		goToEmployeePage: function (oEvent) {
			UIComponent.getRouterFor(this).navTo("RouteEmployeeDetails", {
				data: oEvent.getSource().getBindingContextPath().substr(1)
			});

		},

		onEmployeeIdSelected: function (oEvent) {
			if (oEvent.getSource().getValue()) {
				this.getView().byId("employeesListTable").getBinding("items").filter(new Filter({
					filters: [
						new Filter({
							path: "EmployeeID",
							operator: FilterOperator.EQ,
							value1: parseInt(oEvent.getSource().getValue(), 10)
						})
					]
				}));
			}
		},
		onCitySelected: function (oEvent) {
			if (oEvent.getSource().getValue()) {
				this.getView().byId("employeesListTable").getBinding("items").filter(new Filter({
					filters: [
						new Filter({
							path: "City",
							operator: FilterOperator.Contains,
							value1: oEvent.getSource().getValue()
						})
					]
				}));
			}
		},
		onCountryelected: function (oEvent) {
			if (oEvent.getSource().getValue()) {
				this.getView().byId("employeesListTable").getBinding("items").filter(new Filter({
					filters: [
						new Filter({
							path: "Country",
							operator: FilterOperator.Contains,
							value1: oEvent.getSource().getValue()
						})
					]
				}));
			}
		},
		onRegionSelected: function (oEvent) {

			if (oEvent.getSource().getValue()) {

				if (oEvent.getSource().getValue() === "Unknown") {
					this.getView().byId("employeesListTable").getBinding("items").filter(new Filter({
						filters: [
							new Filter({
								path: "Region",
								operator: FilterOperator.EQ,
								value1: null
							})
						]
					}));
				} else {
					this.getView().byId("employeesListTable").getBinding("items").filter(new Filter({
						filters: [
							new Filter({
								path: "Region",
								operator: FilterOperator.Contains,
								value1: oEvent.getSource().getValue()
							})
						]
					}));
				}
			}
		}

	});

});