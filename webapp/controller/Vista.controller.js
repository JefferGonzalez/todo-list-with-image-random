// eslint-disable-next-line no-undef
sap.ui.define(
  ['sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel'],

  function (Controller, JSONModel) {
    'use strict'

    return Controller.extend('todolist.controller.Vista', {
      onInit: function () {
        const ACTIVITY = {
          name: '',
          participants: 0,
          urlImage: ''
        }
        const BORED_API_URL = 'http://www.boredapi.com/api/activity/'
        const OPENAI_API_URL = 'https://api.openai.com/v1/images/generations'

        const oENV = this.getOwnerComponent().getModel('env')
        const sApiKey = oENV.getProperty('/SAPUI5_OPENAI_API_KEY')

        const OPENAI_API_KEY = `Bearer ${sApiKey}`

        const oActivityModel = new JSONModel()
        fetch(BORED_API_URL)
          .then((response) => response.json())
          .then(({ activity, participants }) => {
            ACTIVITY.name = activity
            ACTIVITY.participants = participants
          })
          .finally(() => {
            const data = {
              prompt: ACTIVITY.name
            }
            fetch(OPENAI_API_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: OPENAI_API_KEY
              },
              body: JSON.stringify(data)
            })
              .then((response) => response.json())
              .then(({ data }) => {
                ACTIVITY.urlImage = data[0].url
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
