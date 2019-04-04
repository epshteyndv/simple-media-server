const fs = require("fs")

module.exports = (req, res) => {
    const fileId = req.params["fileId"]

    if (!fileId) {
        return res.sendStatus(403)
    }

    const file = req.di.library.getItem(fileId)

    fs.stat(file.physicalPath, function (err, stats) {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.sendStatus(404)
            }

            return res.end(err)
        }

        const range = req.headers.range

        if (!range) {
            return res.sendStatus(416)
        }

        const positions = range.replace(/bytes=/, "").split("-")
        const start = parseInt(positions[0], 10)
        const total = stats.size
        const end = positions[1] ? parseInt(positions[1], 10) : total - 1
        const chunksize = (end - start) + 1

        res.writeHead(206, {
            "Content-Range": "bytes " + start + "-" + end + "/" + total,
            "Accept-Ranges": "bytes",
            "Content-Length": chunksize,
            "Content-Type": "video/mp4"
        });

        const stream = fs.createReadStream(file.physicalPath, {
            start: start,
            end: end
        })
        
        stream.on("open", () => stream.pipe(res))
        stream.on("error", err => res.end(err))
    });
}