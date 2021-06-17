import querystring from 'querystring'
import chromium from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'

import getBaseURL from '../../helpers/base-url'

const executablePaths = {
  darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  linux: '/usr/bin/google-chrome',
  win32: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
}

let browser

export default async function handler(req, res) {
  if (!browser) {
    let options

    if (process.env.VERCEL) {
      options = {
        args: chromium.args,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
      }
    } else {
      options = {
        executablePath: executablePaths[process.platform],
        headless: true,
      }
    }

    browser = await puppeteer.launch(options)
  }

  let page

  try {
    page = await browser.newPage()

    const url = `${getBaseURL()}/thumbnail?${querystring.stringify(req.query)}`

    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 })
    await page.goto(url)
    await page.waitForNavigation({ waitUntil: 'networkidle0' })
    await page.evaluateHandle('document.fonts.ready')

    const file = await page.screenshot({ quality: 98, type: 'jpeg' })

    res.setHeader('Content-Type', 'image/jpeg')
    res.setHeader('Cache-Control', 'public, immutable, no-transform, s-maxage=86400, max-age=86400')
    res.send(file)
  } catch (err) {
    console.error(err)

    res.status(500).send(err.toString())
  } finally {
    if (page) {
      await page.close()
    }
  }
}
