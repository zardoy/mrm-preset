import { install, lines, packageJson } from 'mrm-core'
import fsExtra from 'fs-extra'
import { join } from 'path'

module.exports = () => {
    install(['eslint', 'eslint-config-zardoy'], {
        dev: true,
        pnpm: true,
    })

    lines('.eslintrc.json')
        .set([fsExtra.readFileSync(join(__dirname, '.eslintrc.json'), 'utf-8')])
        .save()

    packageJson().appendScript('lint', 'eslint src/**').save()
}
