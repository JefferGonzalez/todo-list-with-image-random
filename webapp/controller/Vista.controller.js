// eslint-disable-next-line no-undef
sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    '../services/activities',
    '../services/images',
    '../utils/storage'
  ],

  function (Controller, JSONModel, activities, images, storage) {
    'use strict'

    return Controller.extend('todolist.controller.Vista', {
      onInit: function () {
        // eslint-disable-next-line
        const oActivities = storage.getActivitiesFromStorage()
        const oActivityModel = new JSONModel()
        oActivityModel.setData(oActivities)
        this._oModel = oActivityModel
        this.getView().setModel(this._oModel, 'activities')
        // eslint-disable-next-line no-undef
        sap.ui.getCore().setModel(this._oModel, 'activities')

        this.onFetchfn()
      },
      onFetchfn: function () {
        const oENV = this.getOwnerComponent().getModel('env')
        const sApiKey = oENV.getProperty('/SAPUI5_OPENAI_API_KEY')
        const OPENAI_API_KEY = `Bearer ${sApiKey}`

        const ACTIVITY = {
          name: '',
          participants: 0,
          images: []
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
              .then(({ data }) => {
                ACTIVITY.images = data
              })
              .then(() => oActivityModel.setData(ACTIVITY))
          })
        this.getView().setModel(oActivityModel, 'activity')
      },
      onAddC: function () {
        const oCarousel = this.byId('carousel')
        const sActivePage = oCarousel.getActivePage()
        const oImage = this.byId(sActivePage)
        const oId = this.byId('textVista')

        // eslint-disable-next-line no-undef
        const oActivities = sap.ui.getCore().getModel('activities')
        const aActivities = oActivities.getData()
        aActivities.push({
          id: aActivities.length + 1,
          name: oId.getText(),
          participants: 0,
          urlImage: oImage.getSrc()
        })
        oActivities.setData(aActivities)
        oActivities.refresh()

        storage.saveActivitiesToStorage(aActivities)
      }
    })
  }
)
