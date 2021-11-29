import { install, lines, file, packageJson } from 'mrm-core'
import { TsConfigJson } from 'type-fest'
import fsExtra from 'fs-extra'

const presets = {
    tsconfig: true,
    node: true,
    'node-lib': true,
    react: true,
}

module.exports = ({ preset }) => {
    const presetDeps: Partial<Record<keyof typeof presets, string[]>> = {
        node: ['@types/node'],
        react: ['react', '@types/react', 'react-dom', '@types/react-dom'],
    }

    install(['typescript', '@zardoy/tsconfig', ...(presetDeps[preset] ?? [])], {
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

    fsExtra.ensureFileSync(`src/index.ts`)
}

module.exports.parameters = {
    preset: {
        type: 'list',
        choices: Object.keys(presets),
        validate(value) {
            return value ? true : '-i is required'
        },
    },
}
