import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
    plugins: [tailwindcss()],
    optimizeDeps: {
        exclude: ['lottie-react', 'lottie-web'],
    },
    build: {
        rollupOptions: {
            external: ['lottie-react', 'lottie-web'],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(process.cwd(), 'src'),
        },
    },
});
