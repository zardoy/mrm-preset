import fsExtra from 'fs-extra'
import { lines, packageJson } from 'mrm-core'
import { join } from 'path'
import { copyAllFiles, installPackages } from '../util'

module.exports = ({ preset }) => {
    const githubWorkflows = '.github/workflows'
    fsExtra.ensureDirSync(githubWorkflows)

    const files = fsExtra.readdirSync(join(__dirname, preset.replace(/-jest$/, ''))).filter(file => file.endsWith('.yml'))
    for (const file of files) {
        lines(join(githubWorkflows, file))
            .set([fsExtra.readFileSync(join(__dirname, preset, file), 'utf-8')])
            .save()
    }

    if (preset === 'vscode-tested') {
        installPackages(['chokidar-cli', '@vscode/test-electron', 'chai', '@types/chai', 'mocha', '@types/mocha', 'glob', '@types/glob'], {})
    }
    if (preset === 'vscode-tested-jest') {
        installPackages(['chokidar-cli', '@vscode/test-electron', 'jest', '@types/jest', 'jest-environment-node', 'cross-env'], {})
        copyAllFiles(__dirname, undefined, ['jest.e2e.config.js'])
    }
    if (preset.startsWith('vscode-tested')) {
        packageJson().set(['release', 'preset', 'runTest'], false)
    }
}

module.exports.parameters = {
    preset: {
        type: 'list',
        choices: ['npm', 'vscode', 'vscode-tested' /*, 'pnpm-monorepo' */],
        validate(value) {
            return value ? true : 'preset is required'
        },
    },
}
