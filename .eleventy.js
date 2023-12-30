const
  SANITY_STUDIO_PROJECT_ID = "71y72ao7",
  SANITY_STUDIO_API_VERSION = "2023-12-30",
  SANITY_STUDIO_DATASET = "production"

module.exports = (eleventyConfig) => {

  eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-webc"))

  eleventyConfig.addJavaScriptFunction("sRef", async reference => {
    try {
      const response = await fetch(`https://${SANITY_STUDIO_PROJECT_ID}.api.sanity.io/v${SANITY_STUDIO_API_VERSION}/data/query/${SANITY_STUDIO_DATASET}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${SANITY_STUDIO_API_TOKEN}`
        },
        body: JSON.stringify({
          query: `*[_id == "${reference}"][0]`
        })
      })
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`)
      }
      const data = await response.json()
      // console.log(data.result)
      return data.result
    } catch (error) {
      console.error(`Error fetching data from Sanity: ${error.message}`)
      return null
    }
  })

}