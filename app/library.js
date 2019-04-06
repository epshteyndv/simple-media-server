const path = require('path')
const base64url = require('base64url')

module.exports = rootDirectory => {
    return {
        getItem: id => {
            var relativePath = ""
            var physicalPath = rootDirectory
            var parentId = ""

            if (id) {
                physicalPath = path.join(rootDirectory, base64url.decode(id))
                relativePath = path.relative(rootDirectory, physicalPath);
                parentId = base64url.encode(path.dirname(relativePath))
            }

            var name = path.basename(physicalPath)

            return {
                name,
                physicalPath,
                parentId,
                getIdFor: e => base64url.encode(path.join(relativePath, e))
            }
        }
    }
}