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
        this.onFetchfn()
        this._oModel = new JSONModel({
          images: [],
          src: '',
          id: ''
        })
        this.getView().setModel(this._oModel, 'images')
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
        console.log(oActivityModel)
        this.getView().setModel(oActivityModel, 'activity')
      },
      onAddC: function () {
        const oCarousel = this.byId('carousel')
        const oImage = this.byId('vistaImage1')
        const oId = this.byId('textVista')
        const aImages = this._oModel.getProperty('/images')
        aImages.push({
          src: oImage.getSrc(),
          id: oId.getText()
        })
        this._oModel.setProperty('/images', aImages)
        console.log(oCarousel)
      }
    })
  }
)
