import dedent from 'dedent'
import { readFileSync, writeFileSync } from 'fs'
import { install, file, updateFile } from 'mrm-core'

module.exports = () => {
    require('../tailwind/index')(false)
    install('styled-components @types/styled-components react-is twin.macro linaria@next'.split(' '), {
        pnpm: true,
    })
    const entrypointPath = 'src/index.tsx'
    const entrypointContents = readFileSync(entrypointPath, 'utf-8')
    if (!entrypointContents.startsWith('/// <reference')) {
        updateFile(
            entrypointPath,
            dedent`
            /// <reference types="twin.macro" />
            /// <reference types="styled-components/cssprop" />` + entrypointContents,
            true,
        )
    }
    if (!entrypointContents.includes("import 'tailwindcss/base.css'")) console.error("don't forget to add base styles!")
    if (entrypointContents.includes("import 'tailwindcss/tailwind.css'")) console.error("don't forget to remove tailwind styles!")
}
