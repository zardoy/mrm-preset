import { file, install, packageJson } from 'mrm-core'
import { basename } from 'path'
import { PackageJson } from 'type-fest'
import fsExtra from 'fs-extra'
import { ensureLicense } from '../util'

/** New VSCode Extension */
module.exports = () => {
    ensureLicense()
    if (!fsExtra.existsSync('index.html')) require('../html/index')()
    require('../pkg/index')()
    require('../ts/index')({ preset: 'react' })
    require('../eslint/index')()

    install(['vite', '@zardoy/vit'], {
        pnpm: true,
    })
    packageJson().prependScript('start', 'vit').prependScript('build', 'vit build').save()
}
