const fs = require("fs")

module.exports = (req, res) => {
    const fileId = req.params["fileId"]

    if (!fileId) {
        return res.sendStatus(403);
    }

    const file = req.di.library.getItem(fileId)

    fs.stat(file.physicalPath, function(err, stats) {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.sendStatus(404);
            }

            return res.end(err);
        }
        
        res.render('watch', { fileId: fileId })
    });
}