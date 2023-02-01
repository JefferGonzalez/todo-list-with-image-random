// eslint-disable-next-line no-undef
sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/ui/model/json/JSONModel'
],

function (Controller, JSONModel) {
  'use strict'

  return Controller.extend('todolist.controller.Vista', {
    onInit: function () {
      const oImgModel = new JSONModel()
      fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        // eslint-disable-next-line no-undef
        .then(data => {
          oImgModel.setData(data)
        })
        .then(console.log(oImgModel))
        // eslint-disable-next-line no-undef

      this.getView().setModel(oImgModel, 'img')
    },
    onLandClick: function () {
      // eslint-disable-next-line no-undef
      this.getRouter().getTargets().display('vista', {
        fromTarget: 'vista'
      })
    }
  })
}
)
