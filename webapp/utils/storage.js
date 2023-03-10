// eslint-disable-next-line no-undef
sap.ui.define([], function () {
  'use strict'

  return {
    /**
     * Save activities to local storage
     * @param {Array.<{id: Number, name:String, participants: Number, urlImage: String}> | any[]} activities
     * @returns {void}
     */
    saveActivitiesToStorage: function (activities) {
      const Activities = [...activities]
      window.localStorage.setItem('activities', JSON.stringify({ Activities }))
    },
    /**
     * Get activities from local storage
     * @returns {Array.<{id: Number,name:String, participants: Number, urlImage: String}>}
     */
    getActivitiesFromStorage: function () {
      const activities = window.localStorage.getItem('activities')
      return activities ? JSON.parse(activities).Activities : []
    }
  }
})
