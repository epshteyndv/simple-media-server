const fs = require("fs")

module.exports = (req, res) => {
    const directory = req.di.library.getItem(req.params["directoryId"])

    fs.readdir(directory.physicalPath, { withFileTypes: true }, (err, entries) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.sendStatus(404);
            }
            
            return res.end(err);
        }

        const files = []
        const directories = []

        entries.forEach(entry => {
            const item = { id: directory.getIdFor(entry.name), name: entry.name }

            if (entry.isFile()) {
                files.push(item)
            }

            if (entry.isDirectory()) {
                directories.push(item)
            }
        })

        res.render('index', { files, directories, title: directory.name, parentId: directory.parentId })
    })
}