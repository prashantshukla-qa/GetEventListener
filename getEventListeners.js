const puppeteer = require('puppeteer');

class GetEventListeners {
    async  getEventListenersForTree(url, elemid) {

        try {

            const options = { devtools: false };
            const browser = await puppeteer.launch({ ...options, args: puppeteer.defaultArgs(options) });
            const page = await browser.newPage();
            await page.goto(url);

            var client = await page.target().createCDPSession()

            var elementexpression = "document.querySelector('" + elemid + "')";
            var returnJson = {};
            var counter = 0;
            var { result } = await client.send('Runtime.evaluate', { expression: elementexpression })
            while (result.subtype == 'node') {
                returnJson["object"+counter] = result;
                var { listeners } = await client.send('DOMDebugger.getEventListeners', { objectId: result.objectId })
                returnJson["object"+counter].events = listeners;
                elementexpression = elementexpression + ".parentElement"
                var { result } = await client.send('Runtime.evaluate', { expression: elementexpression })
                counter++
            }
            await browser.close()
        } catch (err) {
            console.log(err)
            await browser.close()
        }
        return returnJson;
    }

    async getEventListenersForElement(url, elemid) {
            try {
                const options = { devtools: false };
                const browser = await puppeteer.launch({ ...options, args: puppeteer.defaultArgs(options) });
                const page = await browser.newPage();
                await page.goto(url);

                var client = await page.target().createCDPSession()

                var elementexpression = "document.querySelector('" + elemid + "')";
                var { result } = await client.send('Runtime.evaluate', { expression: elementexpression })

                var { listeners } = await client.send('DOMDebugger.getEventListeners', { objectId: result.objectId })
                await browser.close()
            } catch (err) {
                console.log(err)
                await browser.close()
            }
            return listeners;
    }
}


module.exports = GetEventListeners;