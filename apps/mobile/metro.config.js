// Filen skal hete: apps/mobile/metro.config.js

const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Finner rot-mappen til mobil-prosjektet
const projectRoot = __dirname;
// Finner rot-mappen til hele monorepoet (to nivåer opp fra /apps/mobile)
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. Tillat Metro å finne node_modules i rot-mappen av monorepoet
config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(workspaceRoot, 'node_modules'),
];

// 2. Fortell Metro at den skal følge med på endringer i hele monorepoet.
//    Dette er kritisk for at den skal finne koden i f.eks. 'packages/ui'.
config.watchFolders = [workspaceRoot];

// Valgfri, men god praksis:
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
