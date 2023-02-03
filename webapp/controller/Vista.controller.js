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
      const oNewImagen = new JSONModel()
      fetch('http://www.boredapi.com/api/activity/')
        .then(response => response.json())
        // eslint-disable-next-line no-undef
        .then(data => {
          oImgModel.setData(data)
        })
        .then(console.log(oImgModel))
        // eslint-disable-next-line no-undef

      this.getView().setModel(oImgModel, 'img')
      const apiUrl = 'https://api.openai.com/v1/images/generations'

      const data = {
        model: 'image-alpha-001',
        prompt: 'A bird sitting on a tree branch',
        n: 1,
        size: '256x256'
      }

      const apiKey = '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'

      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then(({ data }) => oNewImagen.setData(data))
        .then(console.log(oNewImagen))
        .catch((error) => console.error(error))
      this.getView().setModel(oNewImagen, 'nImg')
      /* fetch('https://api.thecatapi.com/v1/images/search?limit=10')
        .then(response => response.json())
        // eslint-disable-next-line no-undef
        .then(data => {
          oImgModel.setData(data)
        })
        .then(console.log(oImgModel))
        // eslint-disable-next-line no-undef

      this.getView().setModel(oImgModel, 'img') */
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
