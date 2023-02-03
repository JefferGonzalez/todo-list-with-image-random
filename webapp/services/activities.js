// eslint-disable-next-line no-undef
sap.ui.define([], function () {
  'use strict'
  const BORED_API_URL = 'http://www.boredapi.com/api/activity/'

  return {
    getActivity: async function () {
      const response = await fetch(BORED_API_URL)
      const { activity, participants } = await response.json()
      return { activity, participants }
    }
  }
})
