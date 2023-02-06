// eslint-disable-next-line no-undef
sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'sap/ui/model/Sorter',
    '../utils/storage'
  ],
  function (Controller, JSONModel, Filter, FilterOperator, Sorter, storage) {
    'use strict'

    return Controller.extend('todolist.controller.ActivitiesList', {
      onInit: function () {
        const oActivities = storage.getActivitiesFromStorage()
        const oActivityModel = new JSONModel()
        oActivityModel.setData(oActivities)
        this._oModel = oActivityModel
        this.getView().setModel(this._oModel, 'activities')

        this._bDescendingSort = false
        this._oList = this.byId('activitiesList')
        this._oTable = this.byId('activitiesTable')
      },
      onChangeDisplayMode: function (oEvent) {
        this._oList.setVisible(!this._oList.getVisible())
        this._oTable.setVisible(!this._oTable.getVisible())
        const oPanel = this.byId('activitiesPanel')
        oPanel.setExpanded(false)
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
      },
      onDeleteActivity: function (oEvent) {
        const displayItem = this._oList.getVisible()
          ? this._oList
          : this._oTable
        const oSelectedItem = displayItem.getSelectedItem()
        if (!oSelectedItem) return

        const iIndex = displayItem.indexOfItem(oSelectedItem)
        const oModel = this.getView().getModel('activities')
        const oData = oModel.getData()
        const aNewData = oData
          .filter((_, i) => i !== iIndex)
          .map((oActivity, i) => ({ ...oActivity, id: i + 1 }))

        storage.saveActivitiesToStorage(aNewData)
        oModel.setData(aNewData)
      }
    })
  }
)
