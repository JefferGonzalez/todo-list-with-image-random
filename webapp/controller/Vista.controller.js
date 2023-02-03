// eslint-disable-next-line no-undef
sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    '../services/activities',
    '../services/images'
  ],

  function (Controller, JSONModel, activities, images) {
    'use strict'

    return Controller.extend('todolist.controller.Vista', {
      onInit: async function () {
        const oENV = this.getOwnerComponent().getModel('env')
        const sApiKey = oENV.getProperty('/SAPUI5_OPENAI_API_KEY')
        const OPENAI_API_KEY = `Bearer ${sApiKey}`

        const { activity, participants } = await activities.getActivity()
        const { urlImage } = await images.getRandomImage(
          activity,
          OPENAI_API_KEY
        )

        const oActivityModel = new JSONModel()
        oActivityModel.setData({
          name: activity,
          participants,
          urlImage
        })
        this.getView().setModel(oActivityModel, 'activity')
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
