import { copyFiles } from 'mrm-core'

module.exports = () => {
    copyFiles(__dirname, '.gitignore', { overwrite: true })
}
