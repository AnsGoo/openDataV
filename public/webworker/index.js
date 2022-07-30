importScripts('/pyodide/pyodide.js')

async function loadPyodideAndPackages() {
  self.pyodide = await loadPyodide()
  await self.pyodide.loadPackage(['numpy', 'pytz'])
}
let pyodideReadyPromise = loadPyodideAndPackages()

self.onmessage = async (event) => {
  // make sure loading is done
  await pyodideReadyPromise
  // Don't bother yet with this line, suppose our API is built in such a way:
  const { id, python, ...context } = event.data
  // The worker copies the context in its own "memory" (an object mapping name to values)
  for (const key of Object.keys(context)) {
    self[key] = context[key]
  }
  // Now is the easy part, the one that is similar to working in the main thread:
  try {
    await self.pyodide.loadPackagesFromImports(python)
    let results = await self.pyodide.runPythonAsync(python)
    self.postMessage({ results, id })
  } catch (error) {
    self.postMessage({ error: error.message, id })
  }
}
