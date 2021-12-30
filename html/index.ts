import { lines } from 'mrm-core'

const html = String.raw

module.exports = () => {
    lines('index.html')
        .set([
            html`
                <!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no, viewport-fit=cover" />
                        <title>%VITE_NAME%</title>
                    </head>

                    <body>
                        <div id="root"></div>
                        <script src="./src/index.tsx" type="module"></script>
                    </body>
                </html>
            `,
        ])
        .save()
}
