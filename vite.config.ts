import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import * as process from 'process';

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd());

    return ({
        plugins: [react()],
        build: {
            outDir: 'dist',
            emptyOutDir: true,
        },
        server: {
            port: Number(env.VITE_PORT),
            proxy: {
                '/api': {
                    target: env.VITE_API_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            }
        },
        resolve: {
            alias: {
                'shared': '/src/shared/',
                'widgets': '/src/widgets/',
                'pages': '/src/pages/',
                'app': '/src/app/'
            },
        }
    })
});
