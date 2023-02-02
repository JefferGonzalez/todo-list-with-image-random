// eslint-disable-next-line no-undef
sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
  ],
  function (Controller, JSONModel, Filter, FilterOperator) {
    'use strict'

    return Controller.extend('todolist.controller.ActivitiesList', {
      onInit: function () {
        const oModel = new JSONModel()
        fetch('https://rickandmortyapi.com/api/character')
          .then((response) => response.json())
          .then(({ results }) => oModel.setData(results))

        this.getView().setModel(oModel, 'characters')
      },
      onChangeDisplayMode: function (oEvent) {
        const oList = this.byId('activitiesList')
        const oTable = this.byId('activitiesTable')
        const oPanel = this.byId('activitiesPanel')
        oList.setVisible(!oList.getVisible())
        oTable.setVisible(!oTable.getVisible())
        oPanel.setExpanded(false)
      },
      onFilter: function (oEvent) {
        const aFilter = []
        const sQuery = oEvent.getParameter('query')
        if (sQuery) {
          aFilter.push(new Filter('name', FilterOperator.Contains, sQuery))
        }
        const oList = this.byId('activitiesList')
        const oTable = this.byId('activitiesTable')
        if (oList.getVisible()) {
          oList.getBinding('items').filter(aFilter)
        } else if (oTable.getVisible()) {
          oTable.getBinding('items').filter(aFilter)
        }
      }
    })
  }
)
