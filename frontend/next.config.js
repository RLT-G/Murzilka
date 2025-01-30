/** @type {import('next').NextConfig} */
module.exports = {
    env: {
        REACT_APP_API_URL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
        YM: process.env.YM || '0',
        PROD: process.env.PROD || '0',
    },
    webpack(config, { isServer }) {
        if (!isServer) {
            config.resolve.fallback = {
                fs: false,
                path: false,
                os: false,
                crypto: false,
                stream: false,
                buffer: false,
                util: false
            };
        }

        // Добавляем поддержку видеофайлов
        config.module.rules.push({
            test: /\.(mp4|webm|ogg|swf|avi|mov)$/,
            type: 'asset/resource',
            generator: {
                filename: 'static/media/[name].[hash][ext]',
            },
        });

        return config;
    },
};
