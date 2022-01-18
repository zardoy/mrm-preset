import { install, packageJson } from 'mrm-core'
import { copyAllFiles } from '../util'

module.exports = () => {
    install(['eslint', 'eslint-config-zardoy'], {
        dev: true,
        pnpm: true,
    })

    copyAllFiles(__dirname)

    packageJson().appendScript('lint', 'eslint src/**').save()
}
