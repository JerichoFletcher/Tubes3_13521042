const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        'fs': false,
        'net': false,
        'tls': false,
        'pg-hstore': false,
        'stream': require.resolve('stream-browserify'),
        // 'crypto': false,
        // 'timers': false,
        // 'zlib': false,
        // 'url': false,
        // 'http': false,
        // 'crypto': require.resolve('crypto-browserify'),
        // 'stream': require.resolve('stream-browserify'),
        // 'timers': require.resolve('timers-browserify'),
        // 'zlib': require.resolve('browserify-zlib'),
        // 'url': require.resolve('url'),
        // 'http': require.resolve('stream-http'),
    });
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
        new NodePolyfillPlugin(),
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        }),
    ]);
    // console.log(config);
    return config;
};
