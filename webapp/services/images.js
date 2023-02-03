// eslint-disable-next-line no-undef
sap.ui.define([], function () {
  'use strict'
  const OPENAI_API_URL = 'https://api.openai.com/v1/images/generations'

  return {
    getRandomImage: async function (prompt, OPENAI_API_KEY) {
      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: OPENAI_API_KEY
        },
        body: JSON.stringify({ prompt })
      })
      const { data } = await response.json()
      return { urlImage: data[0].url }
    }
  }
})
