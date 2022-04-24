import { install, packageJson } from 'mrm-core'
import { copyAllFiles } from '../util'

module.exports = ({ isReact }: { isReact?: boolean } = {}) => {
    install(['eslint', 'eslint-config-zardoy', ...(isReact ? ['eslint-plugin-react', 'eslint-plugin-react-hooks'] : [])], {
        dev: true,
        pnpm: true,
    })

    copyAllFiles(__dirname, {}, [isReact ? '.eslint-react.json' : '.eslintrc.json'])

    packageJson().appendScript('lint', 'eslint src/**').save()
}
