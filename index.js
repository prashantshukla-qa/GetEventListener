var express = require("express");
var router = express.Router();
const getEventListeners = require('./getEventListeners')
swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');

var getElementEvents = function (req, res, next) {
  const test = new getEventListeners()
  test.getEventListenersForElement(req.query["url"], req.query["selector"]).then
    (event => {
      res.json(event);
    }
    )
};

var getElementTreeEvents = function (req, res, next) {
  const test = new getEventListeners()
  test.getEventListenersForTree(req.query["url"], req.query["selector"]).then
    (event => {
      res.json(event);
    }
    )
};

var app = express();

router.route("/puppet/getevent").get(getElementEvents)
router.route("/puppet/geteventtree").get(getElementTreeEvents)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});