// eslint-disable-next-line no-undef
sap.ui.define(
  ['sap/ui/core/mvc/Controller', 'sap/ui/core/UIComponent'],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, UIComponent) {
    'use strict'

    return Controller.extend('todolist.controller.Home', {
      onInit: function () {},
      getRouter: function () {
        // eslint-disable-next-line no-undef
        return UIComponent.getRouterFor(this)
      },
      onDisplayNotFound: function () {
        // eslint-disable-next-line no-undef
        alert('Not found')
        // eslint-disable-next-line no-undef
        this.getRouter().getTargets().display('vista', {
          fromTarget: 'vista'
        })
      }
    })
  }
)
