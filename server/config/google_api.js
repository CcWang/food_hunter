var google = require('googleapis');
var plus = google.plus('v1');
var API_KEY = process.env.google_key;

module.exports = {
  get_location: plus.people.get()
} 