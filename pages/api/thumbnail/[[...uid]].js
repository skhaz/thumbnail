import chromium from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'

const executablePaths = {
  darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  linux: '/usr/bin/google-chrome',
  win32: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
}

let browser

export default async function handler(req, res) {
  const { uid = [] } = req.query

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

    const url = (process.env.VERCEL && `https://${process.env.VERCEL_URL}`) || 'http://localhost:3000'

    await page.setViewport({ width: 1200, height: 600, deviceScaleFactor: 1 })
    await page.goto(`${url}/thumbnail?uid=${uid.join('/')}`)
    await page.evaluateHandle('document.fonts.ready')

    const file = await page.screenshot({ quality: 90, type: 'jpeg' })

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
