import { join as pathJoin } from 'pathe'
import { readdirSync } from 'fs'
import type { ComponentsDir } from '@nuxt/schema'
import type { Import } from 'unimport'
import { pascalCase } from 'change-case'

const rootDir = process.cwd()

function buildImportName (name: string) {
  return `use${pascalCase(name.split('.').slice(0, -1).join('.'))}`
}

function buildComponentsAutoImports (nuxtDirs: ComponentsDir[]) {
  const componentsFolderIndex = nuxtDirs.findIndex(dir => dir.path.endsWith('components'))
  nuxtDirs.splice(componentsFolderIndex, 1, {
    path: nuxtDirs[componentsFolderIndex].path,
    pathPrefix: false
  })

  console.info('Building pages components auto-imports')
  function getComponentsDirs (dirName: string) {
    try {
      const dirs = readdirSync(dirName, { withFileTypes: true }).filter(dirent => dirent.isDirectory())
      dirs.forEach((dir) => {
        const dirPath = pathJoin(dirName, dir.name)
        if (dirPath.includes('_components')) {
          nuxtDirs.push({ path: dirPath, pathPrefix: false })
        }
        getComponentsDirs((dirPath))
      })
    } catch {
      console.warn(`No such file or directory, ${dirName}`)
    }
  }
  getComponentsDirs(pathJoin(rootDir, 'pages'))
}

function buildScriptsAutoImports (imports: Import[]) {
  console.info('Building pages scripts auto-imports')
  function getScriptsPaths (dirName: string) {
    try {
      const dirs = readdirSync(dirName, { withFileTypes: true })
      dirs.forEach((dirent) => {
        const dirPath = pathJoin(dirName, dirent.name)
        if (['.store.ts', '.service.ts'].some(ext => dirent.name.includes(ext))) {
          imports.push({
            name: 'default',
            as: buildImportName(dirent.name),
            from: dirPath
          })
        }
        if (dirent.isDirectory()) {
          getScriptsPaths((dirPath))
        }
      })
    } catch {
      console.warn(`No such file or directory, ${dirName}`)
    }
  }
  getScriptsPaths(pathJoin(rootDir, 'pages'))
  getScriptsPaths(pathJoin(rootDir, 'composables'))
  getScriptsPaths(pathJoin(rootDir, 'store'))
}

export {
  buildComponentsAutoImports,
  buildScriptsAutoImports
}