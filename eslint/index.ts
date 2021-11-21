import { install, lines } from 'mrm-core'
import fsExtra from 'fs-extra'
import { join } from 'path'

module.exports = () => {
    install(['eslint@^7', 'eslint-plugin-zardoy-config'], {
        dev: true,
        pnpm: true,
    })

    lines('.eslintrc.json')
        .set([fsExtra.readFileSync(join(__dirname, '.eslintrc.json'), 'utf-8')])
        .save()
}
