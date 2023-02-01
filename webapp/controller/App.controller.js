// eslint-disable-next-line no-undef
sap.ui.define(['sap/ui/core/mvc/Controller'], function (BaseController) {
  'use strict'

  return BaseController.extend('todolist.controller.App', {
    onInit () {},

    onHamburgerPress: function (oEvent) {
      const oToolPage = this.getView().byId('toolPage')
      const bSideExpanded = oToolPage.getSideExpanded()
      // Get the resource bundle for i18n texts and get the text for the button tooltip
      const oBundle = this.getView().getModel('i18n').getResourceBundle()
      const sTooltipText = bSideExpanded
        ? oBundle.getText('btnHamburgerExpand')
        : oBundle.getText('btnHamburgerCollapse')
      // Change the tooltip of the button
      oEvent.getSource().setTooltip(sTooltipText)
      // Toggle the side content
      oToolPage.setSideExpanded(!bSideExpanded)
    }
  })
})
