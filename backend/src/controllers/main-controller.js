require('dotenv').config()

const main = async (req, res) => {

  try {
    res.redirect('/getDevices')
  } catch (err) {
    res.sendStatus(500)
  }
}

module.exports = {
  main
}
