const path = require('path')
const base64url = require('base64url')

module.exports = rootDirectory => {
    return {
        getItem: id => {
            var virtualPath = ""
            var physicalPath = rootDirectory

            if (id) {
                virtualPath = base64url.decode(id)
                physicalPath = path.resolve(rootDirectory, virtualPath)
            }

            return {
                physicalPath: physicalPath,
                getIdFor: name => base64url.encode(path.join(virtualPath, name))
            }
        }
    }
}