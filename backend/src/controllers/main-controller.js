require('dotenv').config()

const main = async (req, res) => {

  try {
    res.redirect('/getDevices')
  } catch (err) {
    res.status(500)
  }
}

module.exports = {
  main
}
