/**
 * Is the argument a :any:`PyProxy`?
 * @param jsobj Object to test.
 * @returns Is ``jsobj`` a :any:`PyProxy`?
 */
declare function isPyProxy(jsobj: any): jsobj is PyProxy
type PyProxyCache = {
  cacheId: number
  refcnt: number
  leaked?: boolean
}
type PyProxy = PyProxyClass & {
  [x: string]: any
}
declare class PyProxyClass {
  $$: {
    ptr: number
    cache: PyProxyCache
    destroyed_msg?: string
  }
  $$flags: number
  /** @private */
  constructor()
  get [Symbol.toStringTag](): string
  /**
   * The name of the type of the object.
   *
   * Usually the value is ``"module.name"`` but for builtins or
   * interpreter-defined types it is just ``"name"``. As pseudocode this is:
   *
   * .. code-block:: python
   *
   *    ty = type(x)
   *    if ty.__module__ == 'builtins' or ty.__module__ == "__main__":
   *        return ty.__name__
   *    else:
   *        ty.__module__ + "." + ty.__name__
   *
   */
  get type(): string
  toString(): string
  /**
   * Destroy the ``PyProxy``. This will release the memory. Any further attempt
   * to use the object will raise an error.
   *
   * In a browser supporting `FinalizationRegistry
   * <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry>`_
   * Pyodide will automatically destroy the ``PyProxy`` when it is garbage
   * collected, however there is no guarantee that the finalizer will be run in
   * a timely manner so it is better to ``destroy`` the proxy explicitly.
   *
   * @param destroyed_msg The error message to print if use is attempted after
   *        destroying. Defaults to "Object has already been destroyed".
   */
  destroy(destroyed_msg?: string): void
  /**
   * Make a new PyProxy pointing to the same Python object.
   * Useful if the PyProxy is destroyed somewhere else.
   */
  copy(): PyProxy
  /**
   * Converts the ``PyProxy`` into a JavaScript object as best as possible. By
   * default does a deep conversion, if a shallow conversion is desired, you can
   * use ``proxy.toJs({depth : 1})``. See :ref:`Explicit Conversion of PyProxy
   * <type-translations-pyproxy-to-js>` for more info.
   * @param options
   * @return The JavaScript object resulting from the conversion.
   */
  toJs({
    depth,
    pyproxies,
    create_pyproxies,
    dict_converter,
    default_converter
  }?: {
    /** How many layers deep to perform the conversion. Defaults to infinite */
    depth?: number
    /**
     * If provided, ``toJs`` will store all PyProxies created in this list. This
     * allows you to easily destroy all the PyProxies by iterating the list
     * without having to recurse over the generated structure. The most common
     * use case is to create a new empty list, pass the list as `pyproxies`, and
     * then later iterate over `pyproxies` to destroy all of created proxies.
     */
    pyproxies?: PyProxy[]
    /**
     * If false, ``toJs`` will throw a ``ConversionError`` rather than
     * producing a ``PyProxy``.
     */
    create_pyproxies?: boolean
    /**
     * A function to be called on an iterable of pairs ``[key, value]``. Convert
     * this iterable of pairs to the desired output. For instance,
     * ``Object.fromEntries`` would convert the dict to an object, ``Array.from``
     * converts it to an array of entries, and ``(it) => new Map(it)`` converts
     * it to a ``Map`` (which is the default behavior).
     */
    dict_converter?: (array: Iterable<[key: string, value: any]>) => any
    /**
     * Optional argument to convert objects with no default conversion. See the
     * documentation of :any:`pyodide.to_js`.
     */
    default_converter?: (
      obj: PyProxy,
      convert: (obj: PyProxy) => any,
      cacheConversion: (obj: PyProxy, result: any) => void
    ) => any
  }): any
  /**
   * Check whether the :any:`PyProxy.length` getter is available on this PyProxy. A
   * Typescript type guard.
   */
  supportsLength(): this is PyProxyWithLength
  /**
   * Check whether the :any:`PyProxy.get` method is available on this PyProxy. A
   * Typescript type guard.
   */
  supportsGet(): this is PyProxyWithGet
  /**
   * Check whether the :any:`PyProxy.set` method is available on this PyProxy. A
   * Typescript type guard.
   */
  supportsSet(): this is PyProxyWithSet
  /**
   * Check whether the :any:`PyProxy.has` method is available on this PyProxy. A
   * Typescript type guard.
   */
  supportsHas(): this is PyProxyWithHas
  /**
   * Check whether the PyProxy is iterable. A Typescript type guard for
   * :any:`PyProxy.[iterator]`.
   */
  isIterable(): this is PyProxyIterable
  /**
   * Check whether the PyProxy is iterable. A Typescript type guard for
   * :any:`PyProxy.next`.
   */
  isIterator(): this is PyProxyIterator
  /**
   * Check whether the PyProxy is awaitable. A Typescript type guard, if this
   * function returns true Typescript considers the PyProxy to be a ``Promise``.
   */
  isAwaitable(): this is PyProxyAwaitable
  /**
   * Check whether the PyProxy is a buffer. A Typescript type guard for
   * :any:`PyProxy.getBuffer`.
   */
  isBuffer(): this is PyProxyBuffer
  /**
   * Check whether the PyProxy is a Callable. A Typescript type guard, if this
   * returns true then Typescript considers the Proxy to be callable of
   * signature ``(args... : any[]) => PyProxy | number | bigint | string |
   * boolean | undefined``.
   */
  isCallable(): this is PyProxyCallable
}
type PyProxyWithLength = PyProxy & PyProxyLengthMethods
// Controlled by HAS_LENGTH, appears for any object with __len__ or sq_length
// or mp_length methods
declare class PyProxyLengthMethods {
  /**
   * The length of the object.
   *
   * Present only if the proxied Python object has a ``__len__`` method.
   */
  get length(): number
}
type PyProxyWithGet = PyProxy & PyProxyGetItemMethods
// Controlled by HAS_GET, appears for any class with __getitem__,
// mp_subscript, or sq_item methods
declare class PyProxyGetItemMethods {
  /**
   * This translates to the Python code ``obj[key]``.
   *
   * Present only if the proxied Python object has a ``__getitem__`` method.
   *
   * @param key The key to look up.
   * @returns The corresponding value.
   */
  get(key: any): any
}
type PyProxyWithSet = PyProxy & PyProxySetItemMethods
// Controlled by HAS_SET, appears for any class with __setitem__, __delitem__,
// mp_ass_subscript,  or sq_ass_item.
declare class PyProxySetItemMethods {
  /**
   * This translates to the Python code ``obj[key] = value``.
   *
   * Present only if the proxied Python object has a ``__setitem__`` method.
   *
   * @param key The key to set.
   * @param value The value to set it to.
   */
  set(key: any, value: any): void
  /**
   * This translates to the Python code ``del obj[key]``.
   *
   * Present only if the proxied Python object has a ``__delitem__`` method.
   *
   * @param key The key to delete.
   */
  delete(key: any): void
}
type PyProxyWithHas = PyProxy & PyProxyContainsMethods
// Controlled by HAS_CONTAINS flag, appears for any class with __contains__ or
// sq_contains
declare class PyProxyContainsMethods {
  /**
   * This translates to the Python code ``key in obj``.
   *
   * Present only if the proxied Python object has a ``__contains__`` method.
   *
   * @param key The key to check for.
   * @returns Is ``key`` present?
   */
  has(key: any): boolean
}
type PyProxyIterable = PyProxy & PyProxyIterableMethods
// Controlled by IS_ITERABLE, appears for any object with __iter__ or tp_iter,
// unless they are iterators. See: https://docs.python.org/3/c-api/iter.html
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
// This avoids allocating a PyProxy wrapper for the temporary iterator.
declare class PyProxyIterableMethods {
  /**
   * This translates to the Python code ``iter(obj)``. Return an iterator
   * associated to the proxy. See the documentation for `Symbol.iterator
   * <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator>`_.
   *
   * Present only if the proxied Python object is iterable (i.e., has an
   * ``__iter__`` method).
   *
   * This will be used implicitly by ``for(let x of proxy){}``.
   */
  [Symbol.iterator](): Iterator<any, any, any>
}
type PyProxyIterator = PyProxy & PyProxyIteratorMethods
// Controlled by IS_ITERATOR, appears for any object with a __next__ or
// tp_iternext method.
declare class PyProxyIteratorMethods {
  /** @private */
  [Symbol.iterator](): this
  /**
   * This translates to the Python code ``next(obj)``. Returns the next value of
   * the generator. See the documentation for `Generator.prototype.next
   * <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/next>`_.
   * The argument will be sent to the Python generator.
   *
   * This will be used implicitly by ``for(let x of proxy){}``.
   *
   * Present only if the proxied Python object is a generator or iterator (i.e.,
   * has a ``send`` or ``__next__`` method).
   *
   * @param any The value to send to the generator. The value will be assigned
   * as a result of a yield expression.
   * @returns An Object with two properties: ``done`` and ``value``. When the
   * generator yields ``some_value``, ``next`` returns ``{done : false, value :
   * some_value}``. When the generator raises a ``StopIteration(result_value)``
   * exception, ``next`` returns ``{done : true, value : result_value}``.
   */
  next(arg?: any): IteratorResult<any, any>
}
type PyProxyAwaitable = PyProxy & Promise<any>
type PyProxyCallable = PyProxy & PyProxyCallableMethods & ((...args: any[]) => any)
declare class PyProxyCallableMethods {
  apply(jsthis: PyProxyClass, jsargs: any): any
  call(jsthis: PyProxyClass, ...jsargs: any): any
  /**
   * Call the function with key word arguments.
   * The last argument must be an object with the keyword arguments.
   */
  callKwargs(...jsargs: any): any
}
type PyProxyBuffer = PyProxy & PyProxyBufferMethods
declare class PyProxyBufferMethods {
  /**
   * Get a view of the buffer data which is usable from JavaScript. No copy is
   * ever performed.
   *
   * Present only if the proxied Python object supports the `Python Buffer
   * Protocol <https://docs.python.org/3/c-api/buffer.html>`_.
   *
   * We do not support suboffsets, if the buffer requires suboffsets we will
   * throw an error. JavaScript nd array libraries can't handle suboffsets
   * anyways. In this case, you should use the :any:`toJs` api or copy the
   * buffer to one that doesn't use suboffets (using e.g.,
   * `numpy.ascontiguousarray
   * <https://numpy.org/doc/stable/reference/generated/numpy.ascontiguousarray.html>`_).
   *
   * If the buffer stores big endian data or half floats, this function will
   * fail without an explicit type argument. For big endian data you can use
   * ``toJs``. `DataViews
   * <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView>`_
   * have support for big endian data, so you might want to pass
   * ``'dataview'`` as the type argument in that case.
   *
   * @param type The type of the :any:`PyBuffer.data <pyodide.PyBuffer.data>` field in the
   * output. Should be one of: ``"i8"``, ``"u8"``, ``"u8clamped"``, ``"i16"``,
   * ``"u16"``, ``"i32"``, ``"u32"``, ``"i32"``, ``"u32"``, ``"i64"``,
   * ``"u64"``, ``"f32"``, ``"f64``, or ``"dataview"``. This argument is
   * optional, if absent ``getBuffer`` will try to determine the appropriate
   * output type based on the buffer `format string
   * <https://docs.python.org/3/library/struct.html#format-strings>`_.
   * @returns :any:`PyBuffer <pyodide.PyBuffer>`
   */
  getBuffer(type?: string): PyBuffer
}
type TypedArray =
  | Int8Array
  | Uint8Array
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Uint8ClampedArray
  | Float32Array
  | Float64Array
/**
 * A class to allow access to a Python data buffers from JavaScript. These are
 * produced by :any:`PyProxy.getBuffer` and cannot be constructed directly.
 * When you are done, release it with the :any:`release <PyBuffer.release>`
 * method.  See
 * `Python buffer protocol documentation
 * <https://docs.python.org/3/c-api/buffer.html>`_ for more information.
 *
 * To find the element ``x[a_1, ..., a_n]``, you could use the following code:
 *
 * .. code-block:: js
 *
 *    function multiIndexToIndex(pybuff, multiIndex){
 *       if(multindex.length !==pybuff.ndim){
 *          throw new Error("Wrong length index");
 *       }
 *       let idx = pybuff.offset;
 *       for(let i = 0; i < pybuff.ndim; i++){
 *          if(multiIndex[i] < 0){
 *             multiIndex[i] = pybuff.shape[i] - multiIndex[i];
 *          }
 *          if(multiIndex[i] < 0 || multiIndex[i] >= pybuff.shape[i]){
 *             throw new Error("Index out of range");
 *          }
 *          idx += multiIndex[i] * pybuff.stride[i];
 *       }
 *       return idx;
 *    }
 *    console.log("entry is", pybuff.data[multiIndexToIndex(pybuff, [2, 0, -1])]);
 *
 * .. admonition:: Contiguity
 *    :class: warning
 *
 *    If the buffer is not contiguous, the ``data`` TypedArray will contain
 *    data that is not part of the buffer. Modifying this data may lead to
 *    undefined behavior.
 *
 * .. admonition:: Readonly buffers
 *    :class: warning
 *
 *    If ``buffer.readonly`` is ``true``, you should not modify the buffer.
 *    Modifying a readonly buffer may lead to undefined behavior.
 *
 * .. admonition:: Converting between TypedArray types
 *    :class: warning
 *
 *    The following naive code to change the type of a typed array does not
 *    work:
 *
 *    .. code-block:: js
 *
 *        // Incorrectly convert a TypedArray.
 *        // Produces a Uint16Array that points to the entire WASM memory!
 *        let myarray = new Uint16Array(buffer.data.buffer);
 *
 *    Instead, if you want to convert the output TypedArray, you need to say:
 *
 *    .. code-block:: js
 *
 *        // Correctly convert a TypedArray.
 *        let myarray = new Uint16Array(
 *            buffer.data.buffer,
 *            buffer.data.byteOffset,
 *            buffer.data.byteLength
 *        );
 */
declare class PyBuffer {
  /**
   * The offset of the first entry of the array. For instance if our array
   * is 3d, then you will find ``array[0,0,0]`` at
   * ``pybuf.data[pybuf.offset]``
   */
  offset: number
  /**
   * If the data is readonly, you should not modify it. There is no way
   * for us to enforce this, but it may cause very weird behavior.
   */
  readonly: boolean
  /**
   * The format string for the buffer. See `the Python documentation on
   * format strings
   * <https://docs.python.org/3/library/struct.html#format-strings>`_.
   */
  format: string
  /**
   * How large is each entry (in bytes)?
   */
  itemsize: number
  /**
   * The number of dimensions of the buffer. If ``ndim`` is 0, the buffer
   * represents a single scalar or struct. Otherwise, it represents an
   * array.
   */
  ndim: number
  /**
   * The total number of bytes the buffer takes up. This is equal to
   * ``buff.data.byteLength``.
   */
  nbytes: number
  /**
   * The shape of the buffer, that is how long it is in each dimension.
   * The length will be equal to ``ndim``. For instance, a 2x3x4 array
   * would have shape ``[2, 3, 4]``.
   */
  shape: number[]
  /**
   * An array of of length ``ndim`` giving the number of elements to skip
   * to get to a new element in each dimension. See the example definition
   * of a ``multiIndexToIndex`` function above.
   */
  strides: number[]
  /**
   * The actual data. A typed array of an appropriate size backed by a
   * segment of the WASM memory.
   *
   * The ``type`` argument of :any:`PyProxy.getBuffer`
   * determines which sort of ``TypedArray`` this is. By default
   * :any:`PyProxy.getBuffer` will look at the format string to determine the most
   * appropriate option.
   */
  data: TypedArray
  /**
   * Is it C contiguous?
   */
  c_contiguous: boolean
  /**
   * Is it Fortran contiguous?
   */
  f_contiguous: boolean
  /**
   * @private
   */
  _released: boolean
  /**
   * @private
   */
  _view_ptr: number
  /**
   * @private
   */
  constructor()
  /**
   * Release the buffer. This allows the memory to be reclaimed.
   */
  release(): void
}
/**
 * Load a package or a list of packages over the network. This installs the
 * package in the virtual filesystem. The package needs to be imported from
 * Python before it can be used.
 *
 * @param names Either a single package name or
 * URL or a list of them. URLs can be absolute or relative. The URLs must have
 * file name ``<package-name>.js`` and there must be a file called
 * ``<package-name>.data`` in the same directory. The argument can be a
 * ``PyProxy`` of a list, in which case the list will be converted to JavaScript
 * and the ``PyProxy`` will be destroyed.
 * @param messageCallback A callback, called with progress messages
 *    (optional)
 * @param errorCallback A callback, called with error/warning messages
 *    (optional)
 * @async
 */
declare function loadPackage(
  names: string | PyProxy | Array<string>,
  messageCallback?: (msg: string) => void,
  errorCallback?: (msg: string) => void
): Promise<void>
/**
 * The list of packages that Pyodide has loaded.
 * Use ``Object.keys(pyodide.loadedPackages)`` to get the list of names of
 * loaded packages, and ``pyodide.loadedPackages[package_name]`` to access
 * install location for a particular ``package_name``.
 */
declare let loadedPackages: {
  [key: string]: string
}
/**
 * A JavaScript error caused by a Python exception.
 *
 * In order to reduce the risk of large memory leaks, the ``PythonError``
 * contains no reference to the Python exception that caused it. You can find
 * the actual Python exception that caused this error as `sys.last_value
 * <https://docs.python.org/3/library/sys.html#sys.last_value>`_.
 *
 * See :ref:`type-translations-errors` for more information.
 *
 * .. admonition:: Avoid Stack Frames
 *    :class: warning
 *
 *    If you make a :any:`PyProxy` of ``sys.last_value``, you should be
 *    especially careful to :any:`destroy() <PyProxy.destroy>` it when you are
 *    done. You may leak a large amount of memory including the local
 *    variables of all the stack frames in the traceback if you don't. The
 *    easiest way is to only handle the exception in Python.
 */
declare class PythonError extends Error {
  /**  The address of the error we are wrapping. We may later compare this
   * against sys.last_value.
   * WARNING: we don't own a reference to this pointer, dereferencing it
   * may be a use-after-free error!
   * @private
   */
  __error_address: number
  constructor(message: string, error_address: number)
}
/**
 * An alias to the Python :py:mod:`pyodide` package.
 *
 * You can use this to call functions defined in the Pyodide Python package
 * from JavaScript.
 */
declare let pyodide_py: PyProxy // actually defined in loadPyodide (see pyodide.js)
/**
 *
 * An alias to the global Python namespace.
 *
 * For example, to access a variable called ``foo`` in the Python global
 * scope, use ``pyodide.globals.get("foo")``
 */
declare let globals: PyProxy // actually defined in loadPyodide (see pyodide.js)
/**
 *
 * The Pyodide version.
 *
 * It can be either the exact release version (e.g. ``0.1.0``), or
 * the latest release version followed by the number of commits since, and
 * the git hash of the current commit (e.g. ``0.1.0-1-bd84646``).
 */
declare let version: string // actually defined in loadPyodide (see pyodide.js)
/**
 * Runs a string of Python code from JavaScript, using :any:`pyodide.eval_code`
 * to evaluate the code. If the last statement in the Python code is an
 * expression (and the code doesn't end with a semicolon), the value of the
 * expression is returned.
 *
 * .. admonition:: Positional globals argument
 *    :class: warning
 *
 *    In Pyodide v0.19, this function took the globals parameter as a positional
 *    argument rather than as a named argument. In v0.20 this will still work
 *    but it is deprecated. It will be removed in v0.21.
 *
 * @param code Python code to evaluate
 * @param options
 * @param options.globals An optional Python dictionary to use as the globals.
 *        Defaults to :any:`pyodide.globals`.
 * @returns The result of the Python code translated to JavaScript. See the
 *          documentation for :any:`pyodide.eval_code` for more info.
 */
declare function runPython(
  code: string,
  options?: {
    globals?: PyProxy
  }
): any
/**
 * Inspect a Python code chunk and use :js:func:`pyodide.loadPackage` to install
 * any known packages that the code chunk imports. Uses the Python API
 * :func:`pyodide.find\_imports` to inspect the code.
 *
 * For example, given the following code as input
 *
 * .. code-block:: python
 *
 *    import numpy as np x = np.array([1, 2, 3])
 *
 * :js:func:`loadPackagesFromImports` will call
 * ``pyodide.loadPackage(['numpy'])``.
 *
 * @param code The code to inspect.
 * @param messageCallback The ``messageCallback`` argument of
 * :any:`pyodide.loadPackage` (optional).
 * @param errorCallback The ``errorCallback`` argument of
 * :any:`pyodide.loadPackage` (optional).
 * @async
 */
declare function loadPackagesFromImports(
  code: string,
  messageCallback?: (msg: string) => void,
  errorCallback?: (err: string) => void
): Promise<void>
/**
 * Run a Python code string with top level await using
 * :any:`pyodide.eval_code_async` to evaluate the code. Returns a promise which
 * resolves when execution completes. If the last statement in the Python code
 * is an expression (and the code doesn't end with a semicolon), the returned
 * promise will resolve to the value of this expression.
 *
 * For example:
 *
 * .. code-block:: pyodide
 *
 *    let result = await pyodide.runPythonAsync(`
 *        from js import fetch
 *        response = await fetch("./packages.json")
 *        packages = await response.json()
 *        # If final statement is an expression, its value is returned to JavaScript
 *        len(packages.packages.object_keys())
 *    `);
 *    console.log(result); // 79
 *
 * .. admonition:: Python imports
 *    :class: warning
 *
 *    Since pyodide 0.18.0, you must call :js:func:`loadPackagesFromImports` to
 *    import any python packages referenced via `import` statements in your
 *    code. This function will no longer do it for you.
 *
 * .. admonition:: Positional globals argument
 *    :class: warning
 *
 *    In Pyodide v0.19, this function took the globals parameter as a
 *    positional argument rather than as a named argument. In v0.20 this will
 *    still work  but it is deprecated. It will be removed in v0.21.
 *
 * @param code Python code to evaluate
 * @param options
 * @param options.globals An optional Python dictionary to use as the globals.
 * Defaults to :any:`pyodide.globals`.
 * @returns The result of the Python code translated to JavaScript.
 * @async
 */
declare function runPythonAsync(
  code: string,
  options?: {
    globals?: PyProxy
  }
): Promise<any>
/**
 * Registers the JavaScript object ``module`` as a JavaScript module named
 * ``name``. This module can then be imported from Python using the standard
 * Python import system. If another module by the same name has already been
 * imported, this won't have much effect unless you also delete the imported
 * module from ``sys.modules``. This calls the {any}`pyodide_py` API
 * :func:`pyodide.register_js_module`.
 *
 * @param name Name of the JavaScript module to add
 * @param module JavaScript object backing the module
 */
declare function registerJsModule(name: string, module: object): void
/**
 * Tell Pyodide about Comlink.
 * Necessary to enable importing Comlink proxies into Python.
 */
declare function registerComlink(Comlink: any): void
/**
 * Unregisters a JavaScript module with given name that has been previously
 * registered with :js:func:`pyodide.registerJsModule` or
 * :func:`pyodide.register_js_module`. If a JavaScript module with that name
 * does not already exist, will throw an error. Note that if the module has
 * already been imported, this won't have much effect unless you also delete
 * the imported module from ``sys.modules``. This calls the :any:`pyodide_py` API
 * :func:`pyodide.unregister_js_module`.
 *
 * @param name Name of the JavaScript module to remove
 */
declare function unregisterJsModule(name: string): void
/**
 * Convert the JavaScript object to a Python object as best as possible.
 *
 * This is similar to :any:`JsProxy.to_py` but for use from JavaScript. If the
 * object is immutable or a :any:`PyProxy`, it will be returned unchanged. If
 * the object cannot be converted into Python, it will be returned unchanged.
 *
 * See :ref:`type-translations-jsproxy-to-py` for more information.
 *
 * @param obj
 * @param options
 * @returns The object converted to Python.
 */
declare function toPy(
  obj: any,
  {
    depth,
    defaultConverter
  }?: {
    /**
     *  Optional argument to limit the depth of the conversion.
     */
    depth: number
    /**
     * Optional argument to convert objects with no default conversion. See the
     * documentation of :any:`JsProxy.to_py`.
     */
    defaultConverter?: (
      value: any,
      converter: (value: any) => any,
      cacheConversion: (input: any, output: any) => any
    ) => any
  }
): any
/**
 * Imports a module and returns it.
 *
 * .. admonition:: Warning
 *    :class: warning
 *
 *    This function has a completely different behavior than the old removed pyimport function!
 *
 *    ``pyimport`` is roughly equivalent to:
 *
 *    .. code-block:: js
 *
 *      pyodide.runPython(`import ${pkgname}; ${pkgname}`);
 *
 *    except that the global namespace will not change.
 *
 *    Example:
 *
 *    .. code-block:: js
 *
 *      let sysmodule = pyodide.pyimport("sys");
 *      let recursionLimit = sys.getrecursionlimit();
 *
 * @param mod_name The name of the module to import
 * @returns A PyProxy for the imported module
 */
declare function pyimport(mod_name: string): PyProxy
/**
 * Unpack an archive into a target directory.
 *
 * .. admonition:: Positional globals argument :class: warning
 *
 *    In Pyodide v0.19, this function took the extract_dir parameter as a
 *    positional argument rather than as a named argument. In v0.20 this will
 *    still work  but it is deprecated. It will be removed in v0.21.
 *
 * @param buffer The archive as an ArrayBuffer or TypedArray.
 * @param format The format of the archive. Should be one of the formats
 * recognized by `shutil.unpack_archive`. By default the options are 'bztar',
 * 'gztar', 'tar', 'zip', and 'wheel'. Several synonyms are accepted for each
 * format, e.g., for 'gztar' any of '.gztar', '.tar.gz', '.tgz', 'tar.gz' or
 * 'tgz' are considered to be synonyms.
 *
 * @param options
 * @param options.extractDir The directory to unpack the archive into. Defaults
 * to the working directory.
 */
declare function unpackArchive(
  buffer: TypedArray,
  format: string,
  options?: {
    extractDir?: string
  }
): void
/**
 * Sets the interrupt buffer to be ``interrupt_buffer``. This is only useful
 * when Pyodide is used in a webworker. The buffer should be a
 * ``SharedArrayBuffer`` shared with the main browser thread (or another
 * worker). In that case, signal ``signum`` may be sent by writing ``signum``
 * into the interrupt buffer. If ``signum`` does not satisfy 0 < ``signum`` <
 * ``NSIG`` it will be silently ignored. NSIG is 65 (internally signals are
 * indicated by a bitflag).
 *
 * You can disable interrupts by calling `setInterruptBuffer(undefined)`.
 *
 * If you wish to trigger a ``KeyboardInterrupt``, write ``SIGINT`` (a 2), into
 * the interrupt buffer.
 *
 * By default ``SIGINT`` raises a ``KeyboardInterrupt`` and all other signals
 * are ignored. You can install custom signal handlers with the signal module.
 * Even signals that normally have special meaning and can't be overridden like
 * ``SIGKILL`` and ``SIGSEGV`` are ignored by default and can be used for any
 * purpose you like.
 */
declare function setInterruptBuffer(interrupt_buffer: TypedArray): void
/**
 * Throws a KeyboardInterrupt error if a KeyboardInterrupt has been requested
 * via the interrupt buffer.
 *
 * This can be used to enable keyboard interrupts during execution of JavaScript
 * code, just as ``PyErr_CheckSignals`` is used to enable keyboard interrupts
 * during execution of C code.
 */
declare function checkInterrupt(): void
type PyodideInterface = {
  globals: typeof globals
  FS: typeof FS
  pyodide_py: typeof pyodide_py
  version: typeof version
  loadPackage: typeof loadPackage
  loadPackagesFromImports: typeof loadPackagesFromImports
  loadedPackages: typeof loadedPackages
  isPyProxy: typeof isPyProxy
  runPython: typeof runPython
  runPythonAsync: typeof runPythonAsync
  registerJsModule: typeof registerJsModule
  unregisterJsModule: typeof unregisterJsModule
  setInterruptBuffer: typeof setInterruptBuffer
  checkInterrupt: typeof checkInterrupt
  toPy: typeof toPy
  pyimport: typeof pyimport
  unpackArchive: typeof unpackArchive
  registerComlink: typeof registerComlink
  PythonError: typeof PythonError
  PyBuffer: typeof PyBuffer
}
/**
 * An alias to the `Emscripten File System API
 * <https://emscripten.org/docs/api_reference/Filesystem-API.html>`_.
 *
 * This provides a wide range of POSIX-`like` file/device operations, including
 * `mount
 * <https://emscripten.org/docs/api_reference/Filesystem-API.html#FS.mount>`_
 * which can be used to extend the in-memory filesystem with features like `persistence
 * <https://emscripten.org/docs/api_reference/Filesystem-API.html#persistent-data>`_.
 *
 * While all the file systems implementations are enabled, only the default
 * ``MEMFS`` is guaranteed to work in all runtime settings. The implementations
 * are available as members of ``FS.filesystems``:
 * ``IDBFS``, ``NODEFS``, ``PROXYFS``, ``WORKERFS``.
 */
declare let FS: any
/**
 * Load the main Pyodide wasm module and initialize it.
 *
 * Only one copy of Pyodide can be loaded in a given JavaScript global scope
 * because Pyodide uses global variables to load packages. If an attempt is made
 * to load a second copy of Pyodide, :any:`loadPyodide` will throw an error.
 * (This can be fixed once `Firefox adopts support for ES6 modules in webworkers
 * <https://bugzilla.mozilla.org/show_bug.cgi?id=1247687>`_.)
 *
 * @returns The :ref:`js-api-pyodide` module.
 * @memberof globalThis
 * @async
 */
declare function loadPyodide(options?: {
  /**
   * The URL from which Pyodide will load the main Pyodide runtime and
   * packages. Defaults to the url that pyodide is loaded from with the file
   * name (pyodide.js or pyodide.mjs) removed. It is recommended that you
   * leave this undefined, providing an incorrect value can cause broken
   * behavior.
   */
  indexURL?: string
  /**
   * The home directory which Pyodide will use inside virtual file system. Default: "/home/pyodide"
   */
  homedir?: string
  /** Load the full Python standard library.
   * Setting this to false excludes following modules: distutils.
   * Default: true
   */
  fullStdLib?: boolean
  /**
   * Override the standard input callback. Should ask the user for one line of input.
   */
  stdin?: () => string
  /**
   * Override the standard output callback.
   * Default: undefined
   */
  stdout?: (msg: string) => void
  /**
   * Override the standard error output callback.
   * Default: undefined
   */
  stderr?: (msg: string) => void
  jsglobals?: object
}): Promise<PyodideInterface>
export { loadPyodide }
