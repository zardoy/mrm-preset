import fsExtra from 'fs-extra'
import { install, lines } from 'mrm-core'
import { join } from 'path'

module.exports = () => {
    install(['jest', '@types/jest', 'esbuild-runner'], {
        dev: true,
        pnpm: true,
    })

    const jestConfigFile = 'jest.config.js'
    lines(jestConfigFile)
        .set([fsExtra.readFileSync(join(__dirname, jestConfigFile), 'utf-8')])
        .save()
}
