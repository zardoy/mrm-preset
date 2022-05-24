import { packageJson } from 'mrm-core'

module.exports = () => {
    packageJson()
        .set('prettier', {
            semi: false,
            singleQuote: true,
            proseWrap: 'never',
            tabWidth: 4,
            trailingComma: 'all',
            arrowParens: 'avoid',
            printWidth: 160,
        })
        .save()
}
