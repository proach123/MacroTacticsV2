var express = require('express');
const cors = require('cors')
var router = express.Router();

const server = express();

server.use(cors())
server.use(express.json())

server.get('/', (req, res) =>{
  res.send({ api: 'OK' })
})

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.send({ api: 'OK', dbenv: process.enb.DB_ENV })
// });

module.exports = server;;
