
// Modules importation
const nodemailer = require('nodemailer')
const handlebars = require('handlebars')
const fs = require('fs')

// Import config
const config = require('../config/mail-connection')

// Init transporter
const transporter = nodemailer.createTransport(config)

// Get NODE
const DEV_ENV = process.env.NODE_ENV !== 'production'

// Read the views
const readHTMLFile = (path, callback) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, html) => {
        if (err && DEV_ENV) {
            console.log(err)
        }
        else if (err) {
            console.log('> ! Cannot read mail views')
        }
        else {
            callback(null, html)
        }
    })
}

// Send mail
module.exports = (to, subject, view, replacements) => {
    return new Promise(async (resolve, reject) => {
        readHTMLFile('./api/mail/views/' + view + '.html', async (err, html) => {
            if (err) reject(err)
            const template = handlebars.compile(html)
            const htmlToSend = template(replacements)

            let mailOptions = {
                from: process.env.MAIL_FROM,
                to : to,
                subject : subject,
                html : htmlToSend
            }
            await transporter.sendMail(mailOptions, (err, response) => {
                if (err) reject(err)
                resolve(response)
            })
        })
    })
}