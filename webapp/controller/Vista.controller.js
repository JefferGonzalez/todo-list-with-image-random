// eslint-disable-next-line no-undef
sap.ui.define([
  'sap/ui/core/mvc/Controller'
],
/**
       * @param {typeof sap.ui.core.mvc.Controller} Controller
       */
function (Controller) {
  'use strict'

  return Controller.extend('todolist.controller.Vista', {
    onInit: function () {

    },
    handleButtonPress: function () {
      // eslint-disable-next-line no-undef
      alert('jjj')
      // eslint-disable-next-line no-undef
      const router = sap.ui.core.UIComponent.getRouterFor(this)
      router.navTo('home')
    }

  })
})
