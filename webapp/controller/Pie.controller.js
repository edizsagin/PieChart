sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/BindingMode",
    "sap/ui/model/json/JSONModel",
    "sap/viz/ui5/format/ChartFormatter",
    "sap/viz/ui5/api/env/Format",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/controls/common/feeds/FeedItem",
    "sap/m/MessageBox",
  ],
  function (
    Controller,
    BindingMode,
    JSONModel,
    ChartFormatter,
    Format,
    FlattenedDataset,
    FeedItem,
    MessageBox
  ) {
    "use strict";

    return Controller.extend("pie.controller.Pie", {
      onInit: function () {
        var oRouter = this.getRouter();
        oRouter.getRoute("pie").attachMatched(this._onRouteMatched, this);

        //  Renkleri değiştirmek istersek ;
        // Color Plate link:   https://experience.sap.com/fiori-design-web/values-and-names/
        var oChart = this.getView().byId("VizFrame");
        var oChartProperties = oChart.getVizProperties();
        var aColorPalate = [
          "#596468",
          "#1866b4",
          "#358a4d",
          "#bac1c4",
          "#945ECF",
          "#dc0d0e",
          "#f8cc8c",
        ];
        oChartProperties.plotArea.colorPalette = aColorPalate;
        oChart.setVizProperties(oChartProperties);
      },
      _onRouteMatched: function (oEvent) {
        this.getView().getModel().setSizeLimit(1000);

        this.getView().getModel().refresh(true);
      },
      myOnClickHandler: function () {
        var oChart = this.getView().byId("VizFrame");
        var oPopOver = this.getView().byId("idPopOver");
        oPopOver.connect(oChart.getVizUid());
        // oPopOver.setFormatString(ChartFormatter.DefaultPattern);
      },
      // SwitchChange: function (oEvent) {
      //   var oChart = this.getView().byId("idpiechart"),

      //   var status = oEvent.getSource().getState();
      //   if ((status = "false")) {
      //   }
      // },
      onInputSubmit: function (oEvent) {
        var source = oEvent.getSource().getBindingContext().getProperty();

        var newfreq = oEvent.getSource().getValue();

        var oldfreq = source.Freq;
        var color = source.Color;

        if (newfreq == oldfreq) {
          MessageBox.alert("Aynı değeri girdin");
        } else {
          var oJsonData = {
            Freq: newfreq,
            Color: color,
          };
          var that = this;
          sap.ui.core.BusyIndicator.show(0);
          that
            .getView()
            .getModel()
            .create("/Send_FreqSet", oJsonData, {
              async: false,
              success: function (oData) {
                sap.ui.core.BusyIndicator.hide(0);
                MessageToast.show("Değer değiştirildi");
              },
              error: function (error) {
                sap.ui.core.BusyIndicator.show(0);
                MessageToast.show("Değer değiştirilemedi");
              },
            });
          this.getView().getModel().refresh(true);
          window.location.reload();
        }
      },
      getMessage: function (msgName) {
        var message = this.getView()
          .getModel("i18n")
          .getResourceBundle()
          .getText(msgName);
        MessageToast.show(message, {
          width: "25em",
        });
      },
      getRouter: function () {
        return sap.ui.core.UIComponent.getRouterFor(this);
      },
    });
  }
);
