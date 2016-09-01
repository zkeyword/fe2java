var evs = require('event-stream');

module.exports = function (opt) {

    function processFile(file) {

        if (file.isStream()) {
			console.error(e);
        }

        try {

            if (file.isBuffer()) {
				var rewriter = function(str) {
					
					console.log( opt )
					
					str = str.replace(/<script src="(.*)"><\/script>/g, '<@js serverName="fastued" src="$1" />')
					
					return str;
				}

				file.contents = new Buffer(rewriter( String(file.contents) ));
            }

        } catch (e) {
            console.error(e);
        }

        this.emit('data', file);
    }

    return evs.through(processFile);
};
