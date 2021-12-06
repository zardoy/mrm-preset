import fsExtra from 'fs-extra'
import { install, packageJson } from 'mrm-core'

module.exports = () => {
    const namespace = JSON.parse(fsExtra.readFileSync('./package.json', 'utf-8')).name
    install('@stencil/core', {
        dev: true,
        pnpm: true,
    })
    fsExtra.ensureDirSync('./src/webcomponents')
    fsExtra.writeFileSync(
        './src/webcomponents/component.tsx',
        `import { Component, Event, Listen, State, h, Prop, EventEmitter } from '@stencil/core'

@Component({
    tag: 'some-component',
    styleUrl: 'component.styles.css',
})
export class SomeComponent {
    render() {
        return <div></div>
    }
}`,
        'utf-8',
    )
    const html = String.raw
    fsExtra.writeFileSync(
        './src/webcomponents/index.html',
        html`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Dev Stencil</title>
                    <script type="module" src="/build/${namespace}.esm.js"></script>
                    <script nomodule src="/build/${namespace}.js"></script>
                </head>

                <body>
                    <some-component></some-component>
                </body>
            </html>
        `,
        'utf-8',
    )
    fsExtra.writeFileSync('./src/webcomponents/index.ts', `export { Components, JSX } from './components'\n`, 'utf-8')
    fsExtra.writeFileSync(
        './src/webcomponents/.eslintrc.json',
        `{
    "rules": {
        "new-cap": "off",
        "react/*": "off"
    },
    "extends": ["plugin:@stencil/recommended"]
}
`,
        'utf-8',
    )
    fsExtra.writeFileSync(
        './src/webcomponents/tsconfig.json',
        `{
    "compilerOptions": {
        "allowSyntheticDefaultImports": true,
        "allowUnreachableCode": false,
        "declaration": false,
        "experimentalDecorators": true,
        "lib": ["dom", "es2017"],
        "moduleResolution": "node",
        "module": "esnext",
        "target": "es2017",
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "jsx": "react",
        "jsxFactory": "h"
    },
    "include": ["."]
}
`,
        'utf-8',
    )
    fsExtra.writeFileSync(
        './stencil.config.ts',
        `import { Config } from '@stencil/core'

export const config: Config = {
    namespace: '${namespace}',
    srcDir: 'src/webcomponents',
    outputTargets: [
        {
            type: 'dist',
            esmLoaderPath: '../loader',
        },
        {
            type: 'dist-custom-elements-bundle',
        },
        {
            type: 'docs-readme',
        },
        // {
        //     type: 'docs-vscode',
        //     file: 'custom-elements.json',
        // },
        {
            type: 'www',
            serviceWorker: null, // disable service workers
        },
    ],
    tsconfig: 'src/webcomponents/tsconfig.json',
}
`,
        'utf-8',
    )
}
