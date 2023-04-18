import { packageJson } from 'mrm-core'
import fsExtra from 'fs-extra'
import { ensureGitignore, ensureLicense, installPackages } from '../util'

module.exports = () => {
    ensureLicense()
    ensureGitignore()
    if (!fsExtra.existsSync('index.html')) require('../html/index')()
    require('../pkg/index')()
    require('../ts/index')({ preset: 'react' })

    installPackages(['vite', '@zardoy/vit'], {})
    packageJson().prependScript('start', 'vit').prependScript('build', 'vit build').save()
    require('../cssinjs/index')()
    require('../eslint/index')({ isReact: true })
}
