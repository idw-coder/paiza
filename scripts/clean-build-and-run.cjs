const fs = require('node:fs')
const path = require('node:path')
const { spawnSync } = require('node:child_process')
const ts = require('typescript')

const sourceArgument = process.argv[2]

if (!sourceArgument) {
  console.error('使用方法: npm run clean-build-and-run -- <TypeScriptファイル>')
  process.exit(1)
}

const projectDirectory = path.resolve(__dirname, '..')
const sourcePath = path.resolve(projectDirectory, sourceArgument)
const configPath = path.join(projectDirectory, 'tsconfig.json')

if (!fs.existsSync(sourcePath) || !fs.statSync(sourcePath).isFile()) {
  console.error(`ファイルが見つかりません: ${sourceArgument}`)
  process.exit(1)
}

const configFile = ts.readConfigFile(configPath, ts.sys.readFile)

if (configFile.error) {
  console.error(ts.formatDiagnosticsWithColorAndContext([configFile.error], diagnosticHost()))
  process.exit(1)
}

const config = ts.parseJsonConfigFileContent(configFile.config, ts.sys, projectDirectory)
const configErrors = config.errors.filter(
  (diagnostic) => diagnostic.code !== 18003, // filesを上書きするため「入力がありません」は無視
)

if (configErrors.length > 0) {
  console.error(ts.formatDiagnosticsWithColorAndContext(configErrors, diagnosticHost()))
  process.exit(1)
}

const outDirectory = config.options.outDir

if (!outDirectory) {
  console.error('tsconfig.jsonにoutDirを設定してください')
  process.exit(1)
}

fs.rmSync(outDirectory, { recursive: true, force: true })

const program = ts.createProgram({
  rootNames: [sourcePath],
  options: config.options,
})
const diagnostics = ts.getPreEmitDiagnostics(program)

if (diagnostics.length > 0) {
  console.error(ts.formatDiagnosticsWithColorAndContext(diagnostics, diagnosticHost()))
}

if (diagnostics.some((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error)) {
  process.exit(1)
}

const emitResult = program.emit()

if (emitResult.emitSkipped) {
  console.error(ts.formatDiagnosticsWithColorAndContext(emitResult.diagnostics, diagnosticHost()))
  process.exit(1)
}

const npxCommand = process.platform === 'win32' ? 'npx.cmd' : 'npx'
const runResult = spawnSync(npxCommand, ['tsx', sourcePath], {
  cwd: projectDirectory,
  stdio: 'inherit',
})

if (runResult.error) {
  console.error(runResult.error.message)
  process.exit(1)
}

process.exit(runResult.status ?? 1)

function diagnosticHost() {
  return {
    getCanonicalFileName: (fileName) => fileName,
    getCurrentDirectory: () => projectDirectory,
    getNewLine: () => ts.sys.newLine,
  }
}
