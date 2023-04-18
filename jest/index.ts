import fsExtra from 'fs-extra'
import { lines, packageJson } from 'mrm-core'
import { join } from 'path'
import { installPackages } from '../util'

module.exports = () => {
    installPackages(['jest', '@types/jest', 'esbuild-runner', 'esbuild'], {
        dev: true,
    })

    const jestConfigFile = 'jest.config.js'
    lines(jestConfigFile)
        .set([fsExtra.readFileSync(join(__dirname, jestConfigFile), 'utf-8')])
        .save()

    packageJson().appendScript('test', 'jest').save()
}
