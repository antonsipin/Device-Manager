require('dotenv').config()

const main = async (req, res) => {

  try {
    res.redirect('/devices')
  } catch (err) {
    res.status(500)
  }
}

module.exports = {
  main
}
