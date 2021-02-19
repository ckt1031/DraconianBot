const fetch = require('node-fetch')
function alwaysOn() {
	setInterval(async () => {
		await fetch('https://draconian.koolisw.tk').then(console.log('Pinged!'))
	}, 240000)
}

module.exports = alwaysOn;