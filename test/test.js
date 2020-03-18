var expect = require('chai').expect;
const getEventListeners = require("../getEventListeners")

it('Test geteventListener', function (done) {
    const test = new getEventListeners()
    console.log('prashant')
    test.getEventListenersForTree("https://www.google.com", ".hpuQDe").then(
        event => {
           console.log(event)
        }
    )
    done()
});
