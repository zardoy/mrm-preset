import fsExtra from 'fs-extra'
import { lines } from 'mrm-core'
import { join } from 'path'

module.exports = ({ preset }) => {
    const githubWorkflows = '.github/workflows'
    fsExtra.ensureDirSync(githubWorkflows)

    const files = fsExtra.readdirSync(join(__dirname, preset))
    for (const file of files) {
        lines(join(githubWorkflows, file))
            .set([fsExtra.readFileSync(join(__dirname, preset, file), 'utf-8')])
            .save()
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
