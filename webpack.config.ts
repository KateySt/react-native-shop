import createExpoWebpackConfigAsync from '@expo/webpack-config/webpack';
import {Arguments, Environment} from '@expo/webpack-config/webpack/types';

module.exports = async function (env: Environment, argv: Arguments) {
    const config = await createExpoWebpackConfigAsync(env, argv);
    if (config.resolve?.alias) {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@/*': './src/*',
            '@/api': './src/api',
            '@/components': './src/components',
            '@/utils': './src/utils',
            '@/screens': './src/screens',
            '@/navigation': './src/navigation',
            '@/constants': './src/constants',
        }
    }
    return config;
};
