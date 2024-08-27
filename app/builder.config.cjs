/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = {
  appId: 'net.totoraj.virtu-button',
  productName: 'VirtuButton',
  directories: { buildResources: 'build' },
  asar: true,
  directories: {
    output: 'release/${version}',
  },
  icon: './public/VirtuButton_icon_2.png',
  files: [
    '!**/.vscode/*',
    '!src/*',
    '!electron.vite.config.{js,ts,mjs,cjs}',
    '!{.eslintignore,.eslintrc.cjs,.prettierignore,.prettierrc.yaml,dev-app-update.yml,CHANGELOG.md,README.md}',
    '!{.env,.env.*,.npmrc,pnpm-lock.yaml}',
    '!{tsconfig.json,tsconfig.node.json,tsconfig.web.json}',
    'dist-electron',
    'dist',
  ],
  extraFiles: [
    {
      from: './dist-remote/',
      to: 'remote',
      filter: ['**/*'],
    },
  ],
  extraResources: [],
  asarUnpack: ['resources/**'],
  win: {
    target: 'nsis',
    executableName: 'VirtuButton',
  },
  nsis: {
    artifactName: '${name}-${version}-setup.${ext}',
    shortcutName: '${productName}',
    uninstallDisplayName: '${productName}',
    createDesktopShortcut: false,
    oneClick: false,
    allowToChangeInstallationDirectory: true,
  },
  mac: {
    entitlementsInherit: 'build/entitlements.mac.plist',
    extendInfo: [
      {
        NSCameraUsageDescription:
          "Application requests access to the device's camera.",
      },
      {
        NSMicrophoneUsageDescription:
          "Application requests access to the device's microphone.",
      },
      {
        NSDocumentsFolderUsageDescription:
          "Application requests access to the user's Documents folder.",
      },
      {
        NSDownloadsFolderUsageDescription:
          "Application requests access to the user's Downloads folder.",
      },
    ],
    notarize: false,
  },
  dmg: { artifactName: '${name}-${version}.${ext}' },
  linux: {
    target: ['AppImage', 'snap', 'deb'],
    maintainer: 'electronjs.org',
    category: 'Utility',
  },
  appImage: { artifactName: '${name}-${version}.${ext}' },
  npmRebuild: false,
  publish: { provider: 'generic', url: 'https://example.com/auto-updates' },
};
