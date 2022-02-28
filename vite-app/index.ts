import { install, packageJson } from 'mrm-core'
import fsExtra from 'fs-extra'
import { ensureLicense } from '../util'

module.exports = () => {
    ensureLicense()
    if (!fsExtra.existsSync('index.html')) require('../html/index')()
    require('../pkg/index')()
    require('../ts/index')({ preset: 'react' })

    install(['vite', '@zardoy/vit'], {
        pnpm: true,
    })
    packageJson().prependScript('start', 'vit').prependScript('build', 'vit build').save()
    require('../cssinjs/index')()
    require('../eslint/index')()
}
