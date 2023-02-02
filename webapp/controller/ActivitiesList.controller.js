// eslint-disable-next-line no-undef
sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'sap/ui/model/Sorter'
  ],
  function (Controller, JSONModel, Filter, FilterOperator, Sorter) {
    'use strict'

    return Controller.extend('todolist.controller.ActivitiesList', {
      onInit: function () {
        const oModel = new JSONModel()
        fetch('https://rickandmortyapi.com/api/character')
          .then((response) => response.json())
          .then(({ results }) => oModel.setData(results))

        this.getView().setModel(oModel, 'characters')
        this._bDescendingSort = false
        this._oList = this.byId('activitiesList')
        this._oTable = this.byId('activitiesTable')
      },
      onChangeDisplayMode: function (oEvent) {
        this._oList.setVisible(!this._oList.getVisible())
        this._oTable.setVisible(!this._oTable.getVisible())
      },
      onFilter: function (oEvent) {
        const aFilter = []
        const sQuery = oEvent.getParameter('query')
        if (sQuery) {
          aFilter.push(new Filter('name', FilterOperator.Contains, sQuery))
        }
        const oBinding = this._oList.getVisible()
          ? this._oList.getBinding('items')
          : this._oTable.getBinding('items')

        oBinding.filter(aFilter)
      },

      onSort: function (oEvent) {
        this._bDescendingSort = !this._bDescendingSort
        const oBinding = this._oList.getVisible()
          ? this._oList.getBinding('items')
          : this._oTable.getBinding('items')

        const oSorter = new Sorter('name', this._bDescendingSort)
        oBinding.sort(oSorter)
      }
    })
  }
)
