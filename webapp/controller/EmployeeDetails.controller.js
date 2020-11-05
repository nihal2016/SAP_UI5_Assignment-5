sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"com/yash/assignment5/model/formatter"
], function (Controller, UIComponent, Fragment, Filter, FilterOperator, formatter) {
	"use strict";

	return Controller.extend("com.yash.assignment5.controller.EmployeeDetails", {
		
		formatter: formatter,
		
		onInit: function () {
			UIComponent.getRouterFor(this).getRoute("RouteEmployeeDetails").attachMatched(this._onRouteMatched, this);
			this._showFormFragment("EmployeeInfoDisplay");
		},

		goToOrderDetailsPage: function (oEvent) {
			UIComponent.getRouterFor(this).navTo("RouteOrderDetails", {
				data: oEvent.getSource().getBindingContextPath().substr(1)
			});

		},

		_onRouteMatched: function (oEvent) {
			this.getView().bindElement("/" + oEvent.getParameter("arguments").data);
		},
		onBackButtonPress: function () {
			UIComponent.getRouterFor(this).navTo("RouteEmployeesList");
		},
		handleEditPress: function () {
			this._toggleButtonsAndView(true);
		},
		handleCancelPress: function () {
			this._toggleButtonsAndView(false);
		},
		handleSavePress: function () {
			this._toggleButtonsAndView(false);
		},
		_toggleButtonsAndView: function (bEdit) {
			this.getView().byId("edit").setVisible(!bEdit);
			this.getView().byId("save").setVisible(bEdit);
			this.getView().byId("cancel").setVisible(bEdit);
			this._showFormFragment(bEdit ? "EmployeeInfoChange" : "EmployeeInfoDisplay");
		},
		_formFragments: {},
		_getFormFragment: function (sFragmentName) {
			return sap.ui.xmlfragment(this.getView().getId(), "com.yash.assignment5.fragments." + sFragmentName);
		},

		_showFormFragment: function (sFragmentName) {
			this.byId("formFragments").removeAllContent();
			this.byId("formFragments").insertContent(this._getFormFragment(sFragmentName));
		},
		openPopOverCustomerInfo: function (oEvent) {
			var oButton = oEvent.getSource();
			var path = oButton.getBindingContext().sPath + "/Customer";

			Fragment.load({
				name: "com.yash.assignment5.fragments.CustomerInfoPopover",
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
		},
		onOrderIDSelected: function (oEvent) {
			if (oEvent.getSource().getValue()) {
				this.getView().byId("ordersListTable").getBinding("items").filter(new Filter({
					filters: [
						new Filter({
							path: "OrderID",
							operator: FilterOperator.EQ,
							value1: parseInt(oEvent.getSource().getValue(), 10)
						})
					]
				}));
			}
		},
		onCustomerIDSelected: function (oEvent) {
			if (oEvent.getSource().getValue()) {
				this.getView().byId("ordersListTable").getBinding("items").filter(new Filter({
					filters: [
						new Filter({
							path: "CustomerID",
							operator: FilterOperator.Contains,
							value1: oEvent.getSource().getValue()
						})
					]
				}));
			}
		},
		onShipViaSelected: function (oEvent) {
			if (oEvent.getSource().getValue()) {
				this.getView().byId("ordersListTable").getBinding("items").filter(new Filter({
					filters: [
						new Filter({
							path: "ShipVia",
							operator: FilterOperator.EQ,
							value1: parseInt(oEvent.getSource().getValue(), 10)
						})
					]
				}));
			}
		},
		onTerritoryIDSelected: function (oEvent) {
			if (oEvent.getSource().getValue()) {
				this.getView().byId("territoryListTable").getBinding("items").filter(new Filter({
					filters: [
						new Filter({
							path: "TerritoryID",
							operator: FilterOperator.EQ,
							value1: parseInt(oEvent.getSource().getValue(), 10)
						})
					]
				}));
			}
		}

	});

});