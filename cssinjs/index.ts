import dedent from 'dedent'
import { readFileSync } from 'fs'
import { install, updateFile } from 'mrm-core'

module.exports = () => {
    require('../tailwind/index')(false)
    // linaria@next
    install('styled-components @types/styled-components react-is twin.macro polished'.split(' '), {
        pnpm: true,
    })
    const entrypointPath = 'src/index.tsx'
    const entrypointContents = readFileSync(entrypointPath, 'utf-8')
    if (!entrypointContents.startsWith('/// <reference')) {
        updateFile(entrypointPath, `/// <reference types="@zardoy/vit/twin-sc" />\n${entrypointContents}`, true)
    }
    if (!entrypointContents.includes("import 'tailwindcss/base.css'")) console.error("don't forget to add tailwind base styles!")
    if (entrypointContents.includes("import 'tailwindcss/tailwind.css'")) console.error("don't forget to remove tailwind styles!")
}
