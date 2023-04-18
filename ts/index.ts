import { install, lines, file, packageJson } from 'mrm-core'
import { TsConfigJson } from 'type-fest'
import fsExtra from 'fs-extra'
import { hasVscodeFramework, installPackages } from '../util'

const presets = {
    tsconfig: true,
    node: true,
    'node-lib': true,
    react: true,
}

module.exports = async ({ preset }) => {
    const presetDeps: Partial<Record<keyof typeof presets, [string[], string[]]>> = {
        node: [[], ['@types/node']],
        react: [
            ['react', 'react-dom', '@zardoy/react-util'],
            ['@types/react', '@types/react-dom'],
        ],
    }

    const [deps, devDeps] = presetDeps[preset] ?? [[], []]
    if (deps.length) installPackages(deps, {})
    installPackages(['typescript', '@zardoy/tsconfig', ...devDeps], {
        dev: true,
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
        .set([JSON.stringify(tsconfig, undefined, 4) + '\n'])
        .save()

    if (await hasVscodeFramework()) return
    fsExtra.ensureFileSync(preset === 'react' ? 'src/index.tsx' : 'src/index.ts')
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
