import { install, lines, file, packageJson } from 'mrm-core'
import { TsConfigJson } from 'type-fest'
import fsExtra from 'fs-extra'

module.exports = ({ preset }) => {
    install(['typescript', '@zardoy/tsconfig', ...(preset === 'node' ? ['@types/node'] : [])], {
        dev: true,
        pnpm: true,
    })
    const tsconfig: TsConfigJson = {
        extends: `@zardoy/tsconfig/${preset}`,
        compilerOptions: {},
        include: ['src'],
    }
    if (preset === 'node-lib') {
        tsconfig.compilerOptions!.outDir = 'build'
    }
    lines('tsconfig.json')
        .set([JSON.stringify(tsconfig, undefined, 4)])
        .save()

    const vscodeExtension = Object.keys(packageJson().get().dependencies ?? {}).includes('vscode-framework')
    fsExtra.ensureFileSync(`src/${vscodeExtension ? 'extension.ts' : 'index.ts'}.ts`)
}

module.exports.parameters = {
    preset: {
        type: 'list',
        choices: ['tsconfig', 'node', 'node-lib', 'react'],
        validate(value) {
            return value ? true : '-i is required'
        },
    },
}
