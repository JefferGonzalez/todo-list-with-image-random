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
      onInit: function () {
        const oENV = this.getOwnerComponent().getModel('env')
        const sApiKey = oENV.getProperty('/SAPUI5_OPENAI_API_KEY')
        const OPENAI_API_KEY = `Bearer ${sApiKey}`

        const ACTIVITY = {
          name: '',
          participants: 0,
          urlImage: ''
        }
        const oActivityModel = new JSONModel()
        activities
          .getActivity()
          .then(({ activity, participants }) => {
            ACTIVITY.name = activity
            ACTIVITY.participants = participants
          })
          .finally(() => {
            images
              .getRandomImage(ACTIVITY.name, OPENAI_API_KEY)
              .then(({ urlImage }) => {
                ACTIVITY.urlImage = urlImage
              })
              .then(() => oActivityModel.setData(ACTIVITY))
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
