---
source_url: https://docs.python.org/3/whatsnew/3.15.html
ingested: 2026-11-24
sha256: c0993ce8aea56872e1f6a6a1594726a3551123900e74a2fc817e39fd590640d0
---

[ ![Python logo](../_static/py.svg) ](https://www.python.org/)

Theme  Auto Light Dark

### [Table of Contents](../contents.html)

  * What’s new in Python 3.15
    * Summary – Release highlights
    * New features
      * **PEP 810** : Explicit lazy imports
      * **PEP 814** : Add frozendict built-in type
      * **PEP 661** : Add sentinel built-in type
      * **PEP 799** : A dedicated profiling package
      * Tachyon: High-frequency statistical sampling profiler
      * **PEP 831** : Frame pointers enabled by default
      * **PEP 798** : Unpacking in comprehensions
      * **PEP 829** : Package startup configuration files
      * **PEP 803** : Stable ABI for free-threaded builds
      * **PEP 788** : Protecting the C API from interpreter finalization
      * Improved error messages
    * Other language changes
    * Default interactive shell
    * New modules
      * math.integer
    * Improved modules
      * argparse
      * array
      * ast
      * asyncio
      * base64
      * binascii
      * calendar
      * collections
      * concurrent.futures
      * contextlib
      * ctypes
      * dataclasses
      * dbm
      * difflib
      * email
      * faulthandler
      * functools
      * gc
      * hashlib
      * http.client
      * http.server
      * importlib.metadata
      * inspect
      * json
      * locale
      * math
      * mimetypes
      * mmap
      * os
      * os.path
      * pathlib
      * pdb
      * pickle
      * pickletools
      * pprint
      * re
      * resource
      * shelve
      * socket
      * sqlite3
      * ssl
      * subprocess
      * symtable
      * sys
      * sys.monitoring
      * tarfile
      * threading
      * timeit
      * tkinter
      * tokenize
      * tomllib
      * types
      * typing
      * unicodedata
      * unittest
      * urllib.parse
      * venv
      * warnings
      * wave
      * webbrowser
      * xml
      * xml.parsers.expat
      * zlib
    * Optimizations
      * base64 & binascii
      * csv
      * Upgraded experimental JIT compiler
    * Removed
      * ast
      * collections.abc
      * ctypes
      * datetime
      * glob
      * http.server
      * importlib
      * importlib.resources
      * pathlib
      * platform
      * sre_*
      * sysconfig
      * threading
      * types
      * typing
      * wave
      * zipimport
    * Deprecated
      * New deprecations
      * Pending removal in Python 3.16
      * Pending removal in Python 3.17
      * Pending removal in Python 3.18
      * Pending removal in Python 3.19
      * Pending removal in Python 3.20
      * Pending removal in future versions
      * Soft deprecations
    * C API changes
      * New features
      * Changed C APIs
      * Removed C APIs
      * Deprecated C APIs
    * Build changes
    * Porting to Python 3.15
    * Notable changes in 3.15.2
      * importlib
      * ssl

#### Previous topic

[What’s New in Python](index.html "previous chapter")

#### Next topic

[What’s new in Python 3.14](3.14.html "next chapter")

### This page

  * [Report a bug](../bugs.html)
  * [Improve this page](../improve-page-nojs.html)
  * [Show source ](https://github.com/python/cpython/blob/3.15/Doc/whatsnew/3.15.rst?plain=1)

### Navigation

  * [index](../genindex.html "General Index")
  * [modules](../py-modindex.html "Python Module Index") |
  * [next](3.14.html "What’s new in Python 3.14") |
  * [previous](index.html "What’s New in Python") |
  * ![Python logo](../_static/py.svg)
  * [Python](https://www.python.org/) »
  *   *   * [3.15.2 documentation](../index.html) »
  * [What’s New in Python](index.html) »
  * [What’s new in Python 3.15]()
  * | 
  * Theme  Auto Light Dark |

# What’s new in Python 3.15¶

Editor:

    

Hugo van Kemenade

This article explains the new features in Python 3.15, compared to 3.14.
Python 3.15 was released on 9 October 2026. For full details, see the
[changelog](changelog.html#changelog).

See also

[**PEP 790**](https://peps.python.org/pep-0790/) – Python 3.15 release
schedule

## Summary – Release highlights¶

Python 3.15 is the latest stable release of the Python programming language,
with a mix of changes to the language, the implementation, and the standard
library. The biggest changes include lazy imports, frozendict and sentinel
builtins, UTF-8 as the default encoding, unpacking in comprehensions, and a
stable ABI for free-threaded builds.

The library changes include a new profiling package with Tachyon, a high-
frequency statistical sampling profiler, more color in command-line output, as
well as the usual deprecations and removals, and improvements in user-
friendliness and correctness.

This article doesn’t attempt to provide a complete specification of all new
features, but instead gives a convenient overview. For full details refer to
the documentation, such as the [Library
Reference](../library/index.html#library-index) and [Language
Reference](../reference/index.html#reference-index). To understand the
complete implementation and design rationale for a change, refer to the PEP
for a particular new feature; but note that PEPs usually are not kept up-to-
date once a feature has been fully implemented.

See Porting to Python 3.15 for guidance on upgrading from earlier versions of
Python.

* * *

Interpreter improvements:

  * [**PEP 661**](https://peps.python.org/pep-0661/): Add sentinel built-in type

  * [**PEP 686**](https://peps.python.org/pep-0686/): Python now uses UTF-8 as the default encoding

  * [**PEP 798**](https://peps.python.org/pep-0798/): Unpacking in comprehensions

  * [**PEP 810**](https://peps.python.org/pep-0810/): Explicit lazy imports for faster startup times

  * [**PEP 814**](https://peps.python.org/pep-0814/): Add frozendict built-in type

  * [**PEP 829**](https://peps.python.org/pep-0829/): Package startup configuration files

  * The experimental JIT compiler has been significantly upgraded

  * Improved error messages

Significant improvements in the standard library:

  * [**PEP 799**](https://peps.python.org/pep-0799/): A dedicated profiling package for organizing Python profiling tools

  * [**PEP 799**](https://peps.python.org/pep-0799/): Tachyon: High-frequency statistical sampling profiler

  * More color

New typing features:

  * [**PEP 728**](https://peps.python.org/pep-0728/): TypedDict with typed extra items

  * [**PEP 747**](https://peps.python.org/pep-0747/): Annotating type forms with TypeForm

  * [**PEP 800**](https://peps.python.org/pep-0800/): Disjoint bases in the type system

C API improvements:

  * [**PEP 782**](https://peps.python.org/pep-0782/): A new PyBytesWriter C API to create a Python bytes object

  * [**PEP 788**](https://peps.python.org/pep-0788/): Protection against finalization in the C API

  * [**PEP 803**](https://peps.python.org/pep-0803/), [**820**](https://peps.python.org/pep-0820/), [**793**](https://peps.python.org/pep-0793/): Stable ABI for free-threaded builds and related C API

Build changes:

  * [**PEP 831**](https://peps.python.org/pep-0831/): Frame pointers are enabled by default for improved system-level observability

Release changes:

  * The official Windows 64-bit binaries now use the tail-calling interpreter

  * The official macOS binaries now install free-threading support by default

## New features¶

### [**PEP 810**](https://peps.python.org/pep-0810/): Explicit lazy imports¶

Large Python applications often suffer from slow startup times. A significant
contributor to this problem is the import system: when a module is imported,
Python must locate the file, read it from disk, compile it to bytecode, and
execute all top-level code. For applications with deep dependency trees, this
process can take seconds, even when most of the imported code is never
actually used during a particular run.

Developers have worked around this by moving imports inside functions, using
[`importlib`](../library/importlib.html#module-importlib "importlib: The
implementation of the import machinery.") to load modules on demand, or
restructuring code to avoid unnecessary dependencies. These approaches work
but make code harder to read and maintain, scatter import statements
throughout the codebase, and require discipline to apply consistently.

Python now provides a cleaner solution through explicit
[`lazy`](../reference/simple_stmts.html#lazy) imports using the new `lazy`
soft keyword. When you mark an import as lazy, Python defers the actual module
loading until the imported name is first used. This gives you the
organizational benefits of declaring all imports at the top of the file while
only paying the loading cost for modules you actually use.

The `lazy` keyword works with both `import` and `from ... import` statements.
When you write `lazy import heavy_module`, Python does not immediately load
the module. Instead, it creates a lightweight proxy object. The actual module
loading happens transparently when you first access the name:

    
    
    lazy import json
    lazy from pathlib import Path
    
    print("Starting up...")  # json and pathlib are not fully imported yet
    
    data = json.loads('{"key": "value"}')  # json gets fully imported here
    p = Path(".")  # pathlib gets fully imported here
    

This mechanism is particularly useful for applications that import many
modules at the top level but may only use a subset of them in any given run.
The deferred loading reduces startup latency without requiring code
restructuring or conditional imports scattered throughout the codebase.

In the case where loading a lazily imported module fails (for example, if the
module does not exist), Python raises the exception at the point of first use
rather than at import time. The associated traceback includes both the
location where the name was accessed and the original import statement, making
it straightforward to diagnose and debug the failure.

For cases where you want to enable lazy loading globally without modifying
source code, Python provides the [`-X
lazy_imports`](../using/cmdline.html#cmdoption-X) command-line option and the
[`PYTHON_LAZY_IMPORTS`](../using/cmdline.html#envvar-PYTHON_LAZY_IMPORTS)
environment variable. Both accept two values: `all` makes all imports lazy by
default, and `normal` (the default) respects the `lazy` keyword in source
code. The [`sys.set_lazy_imports()`](../library/sys.html#sys.set_lazy_imports
"sys.set_lazy_imports") and
[`sys.get_lazy_imports()`](../library/sys.html#sys.get_lazy_imports
"sys.get_lazy_imports") functions allow changing and querying this mode at
runtime.

For more selective control,
[`sys.set_lazy_imports_filter()`](../library/sys.html#sys.set_lazy_imports_filter
"sys.set_lazy_imports_filter") accepts a callable that determines whether a
specific module should be loaded lazily. The filter receives three arguments:
the importing module’s name (or `None`), the imported module’s name, and the
fromlist (or `None` for regular imports). It should return `True` to allow the
import to be lazy, or `False` to force eager loading. This allows patterns
like making only your own application’s modules lazy while keeping third-party
dependencies eager:

    
    
    import sys
    
    def myapp_filter(importing, imported, fromlist):
        return imported.startswith("myapp.")
    sys.set_lazy_imports_filter(myapp_filter)
    sys.set_lazy_imports("all")
    
    import myapp.slow_module  # lazy (matches filter)
    import json               # eager (does not match filter)
    

The proxy type itself is available as
[`types.LazyImportType`](../library/types.html#types.LazyImportType
"types.LazyImportType") for code that needs to detect lazy imports
programmatically.

There are some restrictions on where the `lazy` keyword can be used. Lazy
imports are only permitted at module scope; using `lazy` inside a function,
class body, or `try`/`except`/`finally` block raises a
[`SyntaxError`](../builtins/exceptions.html#SyntaxError "SyntaxError").
Neither star imports nor future imports can be lazy (`lazy from module import
*` and `lazy from __future__ import ...` both raise `SyntaxError`).

For code that cannot use the `lazy` keyword directly (for example, when
supporting Python versions older than 3.15 while still using lazy imports on
3.15+), a module can define
[`__lazy_modules__`](../reference/datamodel.html#module.__lazy_modules__
"module.__lazy_modules__") as a container of fully qualified module name
strings. Regular `import` statements for those modules are then treated as
lazy, with the same semantics as the `lazy` keyword:

    
    
    __lazy_modules__ = ["json", "pathlib"]
    
    import json     # lazy
    import os       # still eager
    

(Contributed by Pablo Galindo Salgado and Dino Viehland in
[gh-142349](https://github.com/python/cpython/issues/142349).)

See also

[**PEP 810**](https://peps.python.org/pep-0810/) for the full specification
and rationale.

### [**PEP 814**](https://peps.python.org/pep-0814/): Add frozendict built-in
type¶

A new [immutable](../glossary.html#term-immutable) type,
[`frozendict`](../builtins/stdtypes.html#frozendict "frozendict"), is added to
the [`builtins`](../library/builtins.html#module-builtins "builtins: The
module that provides the built-in namespace.") module. It does not allow
modification after creation. A `frozendict` is not a subclass of `dict`; it
inherits directly from `object`. A `frozendict` is
[hashable](../glossary.html#term-hashable) as long as all of its keys and
values are hashable. A `frozendict` preserves insertion order, but comparison
does not take order into account.

For example:

    
    
    >>> a = frozendict(x=1, y=2)
    >>> a
    frozendict({'x': 1, 'y': 2})
    >>> a['z'] = 3
    Traceback (most recent call last):
      File "<python-input-2>", line 1, in <module>
        a['z'] = 3
        ~^^^^^
    TypeError: 'frozendict' object does not support item assignment
    >>> b = frozendict(y=2, x=1)
    >>> hash(a) == hash(b)
    True
    >>> a == b
    True
    

The following standard library modules have been updated to accept
`frozendict`: [`copy`](../library/copy.html#module-copy "copy: Shallow and
deep copy operations."), [`decimal`](../library/decimal.html#module-decimal
"decimal: Implementation of the General Decimal Arithmetic Specification."),
[`json`](../library/json.html#module-json "json: Encode and decode the JSON
format."), [`marshal`](../library/marshal.html#module-marshal "marshal:
Convert Python objects to streams of bytes and back \(with different
constraints\)."), [`plistlib`](../library/plistlib.html#module-plistlib
"plistlib: Generate and parse Apple plist files.") (only for serialization),
[`pickle`](../library/pickle.html#module-pickle "pickle: Convert Python
objects to streams of bytes and back."),
[`pprint`](../library/pprint.html#module-pprint "pprint: Data pretty
printer.") and
[`xml.etree.ElementTree`](../library/xml.etree.elementtree.html#module-
xml.etree.ElementTree "xml.etree.ElementTree: Implementation of the
ElementTree API.").

[`eval()`](../builtins/functions.html#eval "eval") and
[`exec()`](../builtins/functions.html#exec "exec") accept `frozendict` for
_globals_ , and [`type()`](../builtins/functions.html#type "type") and
[`str.maketrans()`](../builtins/stdtypes.html#str.maketrans "str.maketrans")
accept `frozendict` for _dict_.

Code checking for [`dict`](../builtins/stdtypes.html#dict "dict") type using
`isinstance(arg, dict)` can be updated to `isinstance(arg, (dict,
frozendict))` to accept also the `frozendict` type, or to `isinstance(arg,
collections.abc.Mapping)` to accept also other mapping types such as
[`MappingProxyType`](../library/types.html#types.MappingProxyType
"types.MappingProxyType").

(Contributed by Victor Stinner and Donghee Na in
[gh-141510](https://github.com/python/cpython/issues/141510).)

See also

[**PEP 814**](https://peps.python.org/pep-0814/) for the full specification
and rationale.

### [**PEP 661**](https://peps.python.org/pep-0661/): Add sentinel built-in
type¶

A new [`sentinel`](../builtins/functions.html#sentinel "sentinel") type is
added to the [`builtins`](../library/builtins.html#module-builtins "builtins:
The module that provides the built-in namespace.") module for creating unique
sentinel values with a concise representation. Sentinel objects preserve
identity when copied, support use in type expressions with the `|` operator,
and can be pickled when they are importable by module and name.

(Contributed by Jelle Zijlstra in
[gh-148829](https://github.com/python/cpython/issues/148829); PEP 661 written
by Tal Einat.)

See also

[**PEP 661**](https://peps.python.org/pep-0661/) for further details.

### [**PEP 799**](https://peps.python.org/pep-0799/): A dedicated profiling
package¶

A new [`profiling`](../library/profiling.html#module-profiling "profiling:
Python profiling tools for performance analysis.") module has been added to
organize Python’s built-in profiling tools under a single, coherent namespace.
This module contains:

  * [`profiling.tracing`](../library/profiling.tracing.html#module-profiling.tracing "profiling.tracing: Deterministic tracing profiler for Python programs."): deterministic function-call tracing (relocated from `cProfile`).

  * [`profiling.sampling`](../library/profiling.sampling.html#module-profiling.sampling "profiling.sampling: Statistical sampling profiler for Python processes."): a new statistical sampling profiler (named Tachyon).

The `cProfile` module remains as an alias for backwards compatibility. The
[`profile`](../library/profile.html#module-profile "profile: Pure Python
profiler \(deprecated\). \(deprecated\)") module is deprecated and will be
removed in Python 3.17.

(Contributed by Pablo Galindo and László Kiss Kollár in
[gh-138122](https://github.com/python/cpython/issues/138122).)

See also

[**PEP 799**](https://peps.python.org/pep-0799/) for further details.

### Tachyon: High-frequency statistical sampling profiler¶

![Tachyon profiler logo](../_images/tachyon-logo.png)

A new statistical sampling profiler (Tachyon) has been added as
[`profiling.sampling`](../library/profiling.sampling.html#module-
profiling.sampling "profiling.sampling: Statistical sampling profiler for
Python processes."). This profiler enables low-overhead performance analysis
of running Python processes without requiring code modification or process
restart.

Tachyon follows earlier work on external sampling profilers such as
[Austin](https://github.com/P403n1x87/austin), [py-
spy](https://github.com/benfred/py-spy), [Pyflame](https://github.com/uber-
archive/pyflame), and [rbspy](https://github.com/rbspy/rbspy). We thank their
authors and the wider profiling community for their work and ideas.

Unlike deterministic profilers (such as
[`profiling.tracing`](../library/profiling.tracing.html#module-
profiling.tracing "profiling.tracing: Deterministic tracing profiler for
Python programs.")) that instrument every function call, the sampling profiler
periodically captures stack traces from running processes. This approach
provides virtually zero overhead while achieving sampling rates of **up to
1,000,000 Hz** , making it the fastest sampling profiler available for Python
(at the time of its contribution) and ideal for debugging performance issues
in production environments. This capability is particularly valuable for
debugging performance issues in production systems where traditional profiling
approaches would be too intrusive.

Key features include:

  * **Zero-overhead profiling** : Attach to any running Python process without affecting its performance. Ideal for production debugging where you can’t afford to restart or slow down your application.

  * **No code modification required** : Profile existing applications without restart. Simply point the profiler at a running process by PID and start collecting data.

  * **Flexible target modes** :

    * Profile running processes by PID (`attach`) - atta

... [OUTPUT TRUNCATED - 150,062 chars omitted out of 199,987 total] ...

api/gcsupport.html#c.PyObject_GetItemData_DuringGC "PyObject_GetItemData_DuringGC"), [`PyType_GetModuleState_DuringGC()`](../c-api/gcsupport.html#c.PyType_GetModuleState_DuringGC "PyType_GetModuleState_DuringGC"), [`PyModule_GetState_DuringGC()`](../c-api/gcsupport.html#c.PyModule_GetState_DuringGC "PyModule_GetState_DuringGC"), [`PyModule_GetToken_DuringGC()`](../c-api/gcsupport.html#c.PyModule_GetToken_DuringGC "PyModule_GetToken_DuringGC"), [`PyType_GetBaseByToken_DuringGC()`](../c-api/gcsupport.html#c.PyType_GetBaseByToken_DuringGC "PyType_GetBaseByToken_DuringGC"), [`PyType_GetModule_DuringGC()`](../c-api/gcsupport.html#c.PyType_GetModule_DuringGC "PyType_GetModule_DuringGC"), [`PyType_GetModuleByToken_DuringGC()`](../c-api/gcsupport.html#c.PyType_GetModuleByToken_DuringGC "PyType_GetModuleByToken_DuringGC"). (Contributed by Petr Viktorin in [gh-145925](https://github.com/python/cpython/issues/145925).)

  * Add [`PyObject_Dump()`](../c-api/object.html#c.PyObject_Dump "PyObject_Dump") to dump an object to `stderr`. It should only be used for debugging. (Contributed by Victor Stinner in [gh-141070](https://github.com/python/cpython/issues/141070).)

  * Implement [**PEP 820**](https://peps.python.org/pep-0820/): `PySlot` – Unified slot system for the C API. See [Definition slots](../c-api/slots.html#capi-slots) for documentation.

This adds:

    * The [`PySlot`](../c-api/slots.html#c.PySlot "PySlot") struct;

    * the [`PyType_FromSlots()`](../c-api/type.html#c.PyType_FromSlots "PyType_FromSlots") function;

    * new slot IDs: [`Py_slot_end`](../c-api/slots.html#c.Py_slot_end "Py_slot_end"), [`Py_slot_invalid`](../c-api/slots.html#c.Py_slot_invalid "Py_slot_invalid"); [`Py_slot_subslots`](../c-api/slots.html#c.Py_slot_subslots "Py_slot_subslots"), [`Py_tp_slots`](../c-api/type.html#c.Py_tp_slots "Py_tp_slots"), [`Py_mod_slots`](../c-api/module.html#c.Py_mod_slots "Py_mod_slots"); [`Py_tp_name`](../c-api/type.html#c.Py_tp_name "Py_tp_name"), [`Py_tp_basicsize`](../c-api/type.html#c.Py_tp_basicsize "Py_tp_basicsize"), [`Py_tp_extra_basicsize`](../c-api/type.html#c.Py_tp_extra_basicsize "Py_tp_extra_basicsize"), [`Py_tp_itemsize`](../c-api/type.html#c.Py_tp_itemsize "Py_tp_itemsize"), [`Py_tp_flags`](../c-api/type.html#c.Py_tp_flags "Py_tp_flags"), [`Py_tp_metaclass`](../c-api/type.html#c.Py_tp_metaclass "Py_tp_metaclass"), [`Py_tp_module`](../c-api/type.html#c.Py_tp_module "Py_tp_module");

    * convenience macros: [`PySlot_DATA`](../c-api/slots.html#c.PySlot_DATA "PySlot_DATA"), [`PySlot_FUNC`](../c-api/slots.html#c.PySlot_FUNC "PySlot_FUNC"), [`PySlot_SIZE`](../c-api/slots.html#c.PySlot_SIZE "PySlot_SIZE"), [`PySlot_INT64`](../c-api/slots.html#c.PySlot_INT64 "PySlot_INT64"), [`PySlot_UINT64`](../c-api/slots.html#c.PySlot_UINT64 "PySlot_UINT64"), [`PySlot_STATIC_DATA`](../c-api/slots.html#c.PySlot_STATIC_DATA "PySlot_STATIC_DATA"), [`PySlot_END`](../c-api/slots.html#c.PySlot_END "PySlot_END"), [`PySlot_PTR`](../c-api/slots.html#c.PySlot_PTR "PySlot_PTR"), [`PySlot_PTR_STATIC`](../c-api/slots.html#c.PySlot_PTR_STATIC "PySlot_PTR_STATIC").

The
[`PyModule_FromSlotsAndSpec()`](../c-api/module.html#c.PyModule_FromSlotsAndSpec
"PyModule_FromSlotsAndSpec") function and `PyModExport` [module export
hook](../c-api/extension-modules.html#extension-export-hook) also use the new
`PySlot` struct.

The following functions are [soft deprecated](../glossary.html#term-soft-
deprecated):

    * [`PyType_FromSpec()`](../c-api/type.html#c.PyType_FromSpec "PyType_FromSpec")

    * [`PyType_FromSpecWithBases()`](../c-api/type.html#c.PyType_FromSpecWithBases "PyType_FromSpecWithBases")

    * [`PyType_FromModuleAndSpec()`](../c-api/type.html#c.PyType_FromModuleAndSpec "PyType_FromModuleAndSpec")

    * [`PyType_FromMetaclass()`](../c-api/type.html#c.PyType_FromMetaclass "PyType_FromMetaclass")

    * [`PyModule_FromDefAndSpec()`](../c-api/module.html#c.PyModule_FromDefAndSpec "PyModule_FromDefAndSpec")

    * [`PyModule_FromDefAndSpec2()`](../c-api/module.html#c.PyModule_FromDefAndSpec2 "PyModule_FromDefAndSpec2")

    * [`PyModule_ExecDef()`](../c-api/module.html#c.PyModule_ExecDef "PyModule_ExecDef")

The slots [`Py_tp_bases`](../c-api/type.html#c.Py_tp_bases "Py_tp_bases") and
[`Py_tp_base`](../c-api/type.html#c.Py_tp_base "Py_tp_base") are now
equivalent: they can be set either to a single type or a tuple of types. The
`Py_tp_bases` slot is preferred; the other is ignored if both are specified.

(Contributed by Petr Viktorin in
[gh-149044](https://github.com/python/cpython/issues/149044).)

  * Add [`PyUnstable_ThreadState_SetStackProtection()`](../c-api/threads.html#c.PyUnstable_ThreadState_SetStackProtection "PyUnstable_ThreadState_SetStackProtection") and [`PyUnstable_ThreadState_ResetStackProtection()`](../c-api/threads.html#c.PyUnstable_ThreadState_ResetStackProtection "PyUnstable_ThreadState_ResetStackProtection") functions to set the stack protection base address and stack protection size of a Python thread state. (Contributed by Victor Stinner in [gh-139653](https://github.com/python/cpython/issues/139653).)

  * Add [`PyUnstable_SetImmortal()`](../c-api/object.html#c.PyUnstable_SetImmortal "PyUnstable_SetImmortal") C API function to mark objects as [immortal](../glossary.html#term-immortal). (Contributed by Kumar Aditya in [gh-143300](https://github.com/python/cpython/issues/143300).)

  * Restore private provisional `_Py_InitializeMain()` function removed in Python 3.14. (Contributed by Victor Stinner in [gh-142417](https://github.com/python/cpython/issues/142417).)

  * Add [`PyUnstable_DumpTraceback()`](../c-api/exceptions.html#c.PyUnstable_DumpTraceback "PyUnstable_DumpTraceback") and [`PyUnstable_DumpTracebackThreads()`](../c-api/exceptions.html#c.PyUnstable_DumpTracebackThreads "PyUnstable_DumpTracebackThreads") functions to output Python stacktraces. (Contributed by Alex Malyshev in [gh-145559](https://github.com/python/cpython/issues/145559).)

### Changed C APIs¶

  * If the [`Py_TPFLAGS_MANAGED_DICT`](../c-api/typeobj.html#c.Py_TPFLAGS_MANAGED_DICT "Py_TPFLAGS_MANAGED_DICT") or [`Py_TPFLAGS_MANAGED_WEAKREF`](../c-api/typeobj.html#c.Py_TPFLAGS_MANAGED_WEAKREF "Py_TPFLAGS_MANAGED_WEAKREF") flag is set then [`Py_TPFLAGS_HAVE_GC`](../c-api/typeobj.html#c.Py_TPFLAGS_HAVE_GC "Py_TPFLAGS_HAVE_GC") must be set too. (Contributed by Sergey Miryanov in [gh-134786](https://github.com/python/cpython/issues/134786).)

  * [`PyDateTime_IMPORT`](../c-api/datetime.html#c.PyDateTime_IMPORT "PyDateTime_IMPORT") is now thread safe. Code that directly checks `PyDateTimeAPI` for `NULL` should be updated to call `PyDateTime_IMPORT` instead. (Contributed by Kumar Aditya in [gh-141563](https://github.com/python/cpython/issues/141563).)

### Removed C APIs¶

  * Remove deprecated `PyUnicode` functions:

    * `PyUnicode_AsDecodedObject()`: Use [`PyCodec_Decode()`](../c-api/codec.html#c.PyCodec_Decode "PyCodec_Decode") instead.

    * `PyUnicode_AsDecodedUnicode()`: Use [`PyCodec_Decode()`](../c-api/codec.html#c.PyCodec_Decode "PyCodec_Decode") instead; note that some codecs (for example, “base64”) may return a type other than [`str`](../builtins/stdtypes.html#str "str"), such as [`bytes`](../builtins/stdtypes.html#bytes "bytes").

    * `PyUnicode_AsEncodedObject()`: Use [`PyCodec_Encode()`](../c-api/codec.html#c.PyCodec_Encode "PyCodec_Encode") instead.

    * `PyUnicode_AsEncodedUnicode()`: Use [`PyCodec_Encode()`](../c-api/codec.html#c.PyCodec_Encode "PyCodec_Encode") instead; note that some codecs (for example, “base64”) may return a type other than [`bytes`](../builtins/stdtypes.html#bytes "bytes"), such as [`str`](../builtins/stdtypes.html#str "str").

(Contributed by Stan Ulbrych in
[gh-133612](https://github.com/python/cpython/issues/133612).)

  * `PyImport_ImportModuleNoBlock()`: deprecated alias of [`PyImport_ImportModule()`](../c-api/import.html#c.PyImport_ImportModule "PyImport_ImportModule"). (Contributed by Bénédikt Tran in [gh-133644](https://github.com/python/cpython/issues/133644).)

  * `PyWeakref_GetObject()` and `PyWeakref_GET_OBJECT`: use [`PyWeakref_GetRef()`](../c-api/weakref.html#c.PyWeakref_GetRef "PyWeakref_GetRef") instead. The [pythoncapi-compat project](https://github.com/python/pythoncapi-compat) can be used to get `PyWeakref_GetRef()` on Python 3.12 and older. (Contributed by Bénédikt Tran in [gh-133644](https://github.com/python/cpython/issues/133644).)

  * Remove deprecated `PySys_ResetWarnOptions()`. Clear [`sys.warnoptions`](../library/sys.html#sys.warnoptions "sys.warnoptions") and `warnings.filters` instead.

(Contributed by Nikita Sobolev in
[gh-138886](https://github.com/python/cpython/issues/138886).)

The following functions are removed in favor of
[`PyConfig_Get()`](../c-api/init_config.html#c.PyConfig_Get "PyConfig_Get").
The [pythoncapi-compat project](https://github.com/python/pythoncapi-compat)
can be used to get `PyConfig_Get()` on Python 3.13 and older.

  * Python initialization functions:

    * `Py_GetExecPrefix()`: use [`PyConfig_Get("base_exec_prefix")`](../c-api/init_config.html#c.PyConfig_Get "PyConfig_Get") ([`sys.base_exec_prefix`](../library/sys.html#sys.base_exec_prefix "sys.base_exec_prefix")) instead. Use `PyConfig_Get("exec_prefix")` ([`sys.exec_prefix`](../library/sys.html#sys.exec_prefix "sys.exec_prefix")) if [virtual environments](../library/venv.html#venv-def) need to be handled.

    * `Py_GetPath()`: use [`PyConfig_Get("module_search_paths")`](../c-api/init_config.html#c.PyConfig_Get "PyConfig_Get") ([`sys.path`](../library/sys.html#sys.path "sys.path")) instead.

    * `Py_GetPrefix()`: use [`PyConfig_Get("base_prefix")`](../c-api/init_config.html#c.PyConfig_Get "PyConfig_Get") ([`sys.base_prefix`](../library/sys.html#sys.base_prefix "sys.base_prefix")) instead. Use `PyConfig_Get("prefix")` ([`sys.prefix`](../library/sys.html#sys.prefix "sys.prefix")) if [virtual environments](../library/venv.html#venv-def) need to be handled.

    * `Py_GetProgramFullPath()`: use [`PyConfig_Get("executable")`](../c-api/init_config.html#c.PyConfig_Get "PyConfig_Get") ([`sys.executable`](../library/sys.html#sys.executable "sys.executable")) instead.

    * `Py_GetProgramName()`: use [`PyConfig_Get("executable")`](../c-api/init_config.html#c.PyConfig_Get "PyConfig_Get") ([`sys.executable`](../library/sys.html#sys.executable "sys.executable")) instead.

    * `Py_GetPythonHome()`: use [`PyConfig_Get("home")`](../c-api/init_config.html#c.PyConfig_Get "PyConfig_Get") or the [`PYTHONHOME`](../using/cmdline.html#envvar-PYTHONHOME) environment variable instead.

(Contributed by Bénédikt Tran in
[gh-133644](https://github.com/python/cpython/issues/133644).)

### Deprecated C APIs¶

  * Deprecate [**PEP 456**](https://peps.python.org/pep-0456/) support for providing an external definition of the string hashing scheme. Removal is scheduled for Python 3.19.

Previously, embedders could define
[`Py_HASH_ALGORITHM`](../c-api/hash.html#c.Py_HASH_ALGORITHM
"Py_HASH_ALGORITHM") to be `Py_HASH_EXTERNAL` to indicate that the hashing
scheme was provided externally but this feature was undocumented, untested and
most likely unused.

(Contributed by Bénédikt Tran in
[gh-141226](https://github.com/python/cpython/issues/141226).)

  * For unsigned integer formats in [`PyArg_ParseTuple()`](../c-api/arg.html#c.PyArg_ParseTuple "PyArg_ParseTuple"), accepting Python integers with value that is larger than the maximal value for the C type or less than the minimal value for the corresponding signed integer type of the same size is now deprecated. (Contributed by Serhiy Storchaka in [gh-132629](https://github.com/python/cpython/issues/132629).)

  * [`PyBytes_FromStringAndSize(NULL, len)`](../c-api/bytes.html#c.PyBytes_FromStringAndSize "PyBytes_FromStringAndSize") and [`_PyBytes_Resize()`](../c-api/bytes.html#c._PyBytes_Resize "_PyBytes_Resize") are [soft deprecated](../glossary.html#term-soft-deprecated), use the [`PyBytesWriter`](../c-api/bytes.html#c.PyBytesWriter "PyBytesWriter") API instead. (Contributed by Victor Stinner in [gh-129813](https://github.com/python/cpython/issues/129813).)

  * `_PyObject_CallMethodId()`, `_PyObject_GetAttrId()` and `_PyUnicode_FromId()` are deprecated since Python 3.15 and will be removed in Python 3.20. Instead, use [`PyUnicode_InternFromString()`](../c-api/unicode.html#c.PyUnicode_InternFromString "PyUnicode_InternFromString") and cache the result in the module state, then call [`PyObject_CallMethod()`](../c-api/call.html#c.PyObject_CallMethod "PyObject_CallMethod") or [`PyObject_GetAttr()`](../c-api/object.html#c.PyObject_GetAttr "PyObject_GetAttr"). (Contributed by Victor Stinner in [gh-141049](https://github.com/python/cpython/issues/141049).)

  * Deprecate [`cval`](../c-api/complex.html#c.PyComplexObject.cval "PyComplexObject.cval") field of the [`PyComplexObject`](../c-api/complex.html#c.PyComplexObject "PyComplexObject") type. Use [`PyComplex_AsCComplex()`](../c-api/complex.html#c.PyComplex_AsCComplex "PyComplex_AsCComplex") and [`PyComplex_FromCComplex()`](../c-api/complex.html#c.PyComplex_FromCComplex "PyComplex_FromCComplex") to convert a Python complex number to/from the C [`Py_complex`](../c-api/complex.html#c.Py_complex "Py_complex") representation. (Contributed by Sergey B Kirpichev in [gh-128813](https://github.com/python/cpython/issues/128813).)

  * Functions [`_Py_c_sum()`](../c-api/complex.html#c._Py_c_sum "_Py_c_sum"), [`_Py_c_diff()`](../c-api/complex.html#c._Py_c_diff "_Py_c_diff"), [`_Py_c_neg()`](../c-api/complex.html#c._Py_c_neg "_Py_c_neg"), [`_Py_c_prod()`](../c-api/complex.html#c._Py_c_prod "_Py_c_prod"), [`_Py_c_quot()`](../c-api/complex.html#c._Py_c_quot "_Py_c_quot"), [`_Py_c_pow()`](../c-api/complex.html#c._Py_c_pow "_Py_c_pow") and [`_Py_c_abs()`](../c-api/complex.html#c._Py_c_abs "_Py_c_abs") are [soft deprecated](../glossary.html#term-soft-deprecated). (Contributed by Sergey B Kirpichev in [gh-128813](https://github.com/python/cpython/issues/128813).)

  * [`bytes_warning`](../c-api/init_config.html#c.PyConfig.bytes_warning "PyConfig.bytes_warning") is deprecated since Python 3.15 and will be removed in Python 3.17. (Contributed by Nikita Sobolev in [gh-136355](https://github.com/python/cpython/issues/136355).)

  * `Py_INFINITY` macro is [soft deprecated](../glossary.html#term-soft-deprecated), use the C11 standard `<math.h>` `INFINITY` instead. (Contributed by Sergey B Kirpichev in [gh-141004](https://github.com/python/cpython/issues/141004).)

  * The following macros are [soft deprecated](../glossary.html#term-soft-deprecated):

    * [`Py_ALIGNED`](../c-api/intro.html#c.Py_ALIGNED "Py_ALIGNED"): Prefer `alignas` instead.

    * [`PY_FORMAT_SIZE_T`](../c-api/intro.html#c.PY_FORMAT_SIZE_T "PY_FORMAT_SIZE_T"): Use `"z"` directly.

    * [`Py_LL`](../c-api/intro.html#c.Py_LL "Py_LL") and [`Py_ULL`](../c-api/intro.html#c.Py_ULL "Py_ULL"): Use standard suffixes, `LL` and `ULL`.

    * [`PY_LONG_LONG`](../c-api/intro.html#c.PY_LONG_LONG "PY_LONG_LONG"), [`PY_LLONG_MIN`](../c-api/intro.html#c.PY_LLONG_MIN "PY_LLONG_MIN"), [`PY_LLONG_MAX`](../c-api/intro.html#c.PY_LLONG_MAX "PY_LLONG_MAX"), [`PY_ULLONG_MAX`](../c-api/intro.html#c.PY_ULLONG_MAX "PY_ULLONG_MAX"), [`PY_INT32_T`](../c-api/intro.html#c.PY_INT32_T "PY_INT32_T"), [`PY_UINT32_T`](../c-api/intro.html#c.PY_UINT32_T "PY_UINT32_T"), [`PY_INT64_T`](../c-api/intro.html#c.PY_INT64_T "PY_INT64_T"), [`PY_UINT64_T`](../c-api/intro.html#c.PY_UINT64_T "PY_UINT64_T"), [`PY_SIZE_MAX`](../c-api/intro.html#c.PY_SIZE_MAX "PY_SIZE_MAX"): Use C99 types/limits.

    * [`Py_UNICODE_SIZE`](../c-api/intro.html#c.Py_UNICODE_SIZE "Py_UNICODE_SIZE"): Use `sizeof(wchar_t)` directly.

    * [`Py_VA_COPY`](../c-api/intro.html#c.Py_VA_COPY "Py_VA_COPY"): Use `va_copy` directly.

The macro [`Py_UNICODE_WIDE`](../c-api/intro.html#c.Py_UNICODE_WIDE
"Py_UNICODE_WIDE"), which was scheduled for removal, is [soft
deprecated](../glossary.html#term-soft-deprecated) instead.

(Contributed by Petr Viktorin in
[gh-146175](https://github.com/python/cpython/issues/146175).)

  * `Py_MATH_El` and `Py_MATH_PIl` are deprecated since Python 3.15 and will be removed in Python 3.20. (Contributed by Sergey B Kirpichev in [gh-141004](https://github.com/python/cpython/issues/141004).)

## Build changes¶

  * Removed implicit fallback to the bundled copy of the `libmpdec` library. Now this should be explicitly enabled with [`--with-system-libmpdec`](../using/configure.html#cmdoption-with-system-libmpdec) set to `no` or with `--without-system-libmpdec`. (Contributed by Sergey B Kirpichev in [gh-115119](https://github.com/python/cpython/issues/115119).)

  * The new configure option [`--with-missing-stdlib-config=FILE`](../using/configure.html#cmdoption-with-missing-stdlib-config) allows distributors to pass a [JSON](https://www.json.org/json-en.html) configuration file containing custom error messages for [standard library](../glossary.html#term-standard-library) modules that are missing or packaged separately. (Contributed by Stan Ulbrych and Petr Viktorin in [gh-139707](https://github.com/python/cpython/issues/139707).)

  * The new configure option [`--with-pymalloc-hugepages`](../using/configure.html#cmdoption-with-pymalloc-hugepages) enables huge page support for [pymalloc](../c-api/memory.html#pymalloc) arenas. When enabled, arena size increases to 2 MiB and allocation uses `MAP_HUGETLB` (Linux) or `MEM_LARGE_PAGES` (Windows) with automatic fallback to regular pages. On Windows, use `build.bat --pymalloc-hugepages`. At runtime, huge pages must be explicitly enabled by setting the [`PYTHON_PYMALLOC_HUGEPAGES`](../using/cmdline.html#envvar-PYTHON_PYMALLOC_HUGEPAGES) environment variable to `1`. (Contributed by Pablo Galindo Salgado in [gh-144319](https://github.com/python/cpython/issues/144319).)

  * Annotating anonymous mmap usage is now supported if the Linux kernel supports _[PR_SET_VMA_ANON_NAME](https://manpages.debian.org/PR_SET_VMA\(2const\))_ (Linux 5.17 or newer). Annotations are visible in `/proc/<pid>/maps` if the kernel supports the feature and [`-X dev`](../using/cmdline.html#cmdoption-X) is passed to Python, or Python is built in [debug mode](../using/configure.html#debug-build). (Contributed by Donghee Na in [gh-141770](https://github.com/python/cpython/issues/141770).)

  * CPython is now built with frame pointers enabled by default ([**PEP 831**](https://peps.python.org/pep-0831/)). Pass [`--without-frame-pointers`](../using/configure.html#cmdoption-without-frame-pointers) to opt out.

Authors of C extensions and native libraries built with custom build systems
should ensure the unwind chain is intact. This is usually done by adding
`-fno-omit-frame-pointer` and similar flags to `CFLAGS`. See [`--without-
frame-pointers`](../using/configure.html#cmdoption-without-frame-pointers)
documentation for the specific flags Python uses.

(Contributed by Pablo Galindo Salgado and Savannah Ostrowski in
[gh-149201](https://github.com/python/cpython/issues/149201).)

  * 64-bit builds using Visual Studio 2026 (MSVC 18) may now use the new [tail-calling interpreter](3.14.html#whatsnew314-tail-call-interpreter). Results on Visual Studio 18.1.1 report between [15-20%](https://github.com/faster-cpython/ideas/blob/main/results/5800X-msvc.pgo2-vs-msvc.pgo.tc.svg) speedup on the geometric mean of pyperformance on Windows x86-64 over the switch-case interpreter on an AMD Ryzen 7 5800X. We have observed speedups ranging from 14% for large pure-Python libraries to 40% for long-running small pure-Python scripts on Windows. This was made possible by a new feature introduced in MSVC 18, which the official Windows 64-bit binaries on [python.org](https://www.python.org/downloads/windows/) now use. (Contributed by Chris Eibl, Ken Jin, and Brandt Bucher in [gh-143068](https://github.com/python/cpython/issues/143068). Special thanks to Steve Dower, and the MSVC team including Hulon Jenkins.)

## Porting to Python 3.15¶

This section lists previously described changes and other bugfixes that may
require changes to your code.

  * [`sqlite3.Connection`](../library/sqlite3.html#sqlite3.Connection "sqlite3.Connection") APIs have been cleaned up.

    * All parameters of [`sqlite3.connect()`](../library/sqlite3.html#sqlite3.connect "sqlite3.connect") except _database_ are now keyword-only.

    * The first three parameters of methods [`create_function()`](../library/sqlite3.html#sqlite3.Connection.create_function "sqlite3.Connection.create_function") and [`create_aggregate()`](../library/sqlite3.html#sqlite3.Connection.create_aggregate "sqlite3.Connection.create_aggregate") are now positional-only.

    * The first parameter of methods [`set_authorizer()`](../library/sqlite3.html#sqlite3.Connection.set_authorizer "sqlite3.Connection.set_authorizer"), [`set_progress_handler()`](../library/sqlite3.html#sqlite3.Connection.set_progress_handler "sqlite3.Connection.set_progress_handler") and [`set_trace_callback()`](../library/sqlite3.html#sqlite3.Connection.set_trace_callback "sqlite3.Connection.set_trace_callback") is now positional-only.

(Contributed by Serhiy Storchaka in
[gh-133595](https://github.com/python/cpython/issues/133595).)

  * [`resource.RLIM_INFINITY`](../library/resource.html#resource.RLIM_INFINITY "resource.RLIM_INFINITY") is now always positive. Passing a negative integer value that corresponded to its old value (such as `-1` or `-3`, depending on platform) to [`resource.setrlimit()`](../library/resource.html#resource.setrlimit "resource.setrlimit") and [`resource.prlimit()`](../library/resource.html#resource.prlimit "resource.prlimit") is now deprecated. (Contributed by Serhiy Storchaka in [gh-137044](https://github.com/python/cpython/issues/137044).)

  * [`mmap.mmap.resize()`](../library/mmap.html#mmap.mmap.resize "mmap.mmap.resize") has been removed on platforms that don’t support the underlying syscall, instead of raising a [`SystemError`](../builtins/exceptions.html#SystemError "SystemError"). (Contributed by An Long in [gh-138205](https://github.com/python/cpython/issues/138205).)

  * A resource warning is now emitted for an unclosed [`xml.etree.ElementTree.iterparse()`](../library/xml.etree.elementtree.html#xml.etree.ElementTree.iterparse "xml.etree.ElementTree.iterparse") iterator if it opened a file. Use its `close()` method or the [`contextlib.closing()`](../library/contextlib.html#contextlib.closing "contextlib.closing") context manager to close it. (Contributed by Osama Abdelkader and Serhiy Storchaka in [gh-140601](https://github.com/python/cpython/issues/140601).)

  * If a short option and a single-dash long option are passed to [`argparse.ArgumentParser.add_argument()`](../library/argparse.html#argparse.ArgumentParser.add_argument "argparse.ArgumentParser.add_argument"), _dest_ is now inferred from the single-dash long option. For example, in `add_argument('-f', '-foo')`, _dest_ is now `'foo'` instead of `'f'`. Pass an explicit _dest_ argument to preserve the old behavior. (Contributed by Serhiy Storchaka in [gh-138697](https://github.com/python/cpython/issues/138697).)

  * Padding of input no longer required in [`base64.urlsafe_b64decode()`](../library/base64.html#base64.urlsafe_b64decode "base64.urlsafe_b64decode"). Pass a new argument `padded=True` or use [`base64.b64decode()`](../library/base64.html#base64.b64decode "base64.b64decode") with argument `altchars=b'-_'` (this works with older Python versions) to make padding required. (Contributed by Serhiy Storchaka in [gh-73613](https://github.com/python/cpython/issues/73613).)

  * Since [`unittest.TestCase.assertWarns()`](../library/unittest.html#unittest.TestCase.assertWarns "unittest.TestCase.assertWarns") and [`unittest.TestCase.assertWarnsRegex()`](../library/unittest.html#unittest.TestCase.assertWarnsRegex "unittest.TestCase.assertWarnsRegex") no longer swallow warnings that do not match the specified category or regex, your tests may start leaking some warnings that were previously masked. Use warning filters to silence them or additional `assertWarns*()` to catch and check them. (Contributed by Serhiy Storchaka in [gh-143231](https://github.com/python/cpython/issues/143231).)

## Notable changes in 3.15.2¶

### importlib¶

  * Threads that simultaneously perform first-time `import package.submodule` imports no longer risk a deadlock or spurious import errors, a regression introduced in 3.15.0 by the fix for [gh-83065](https://github.com/python/cpython/issues/83065). A package’s import lock is now released as soon as its `__init__` returns. [`importlib.import_module()`](../library/importlib.html#importlib.import_module "importlib.import_module") now returns the partially initialized module in a circular import split across threads, as the [`import`](../reference/simple_stmts.html#import) statement already did, instead of raising `_DeadlockError`. (Contributed by Gregory P. Smith in [gh-159963](https://github.com/python/cpython/issues/159963).)

### ssl¶

  * The [`ssl`](../library/ssl.html#module-ssl "ssl: TLS/SSL wrapper for socket objects") module now rejects TLS certificate chains that contain one of a set of compromised eMudhra intermediate CA certificates. The affected certificates are identified by their public key, so cross-signed copies that reuse the same key are blocked as well. It is a defense-in-depth backstop that applies even when an application supplies its own root CA bundle, and regardless of whether the platform trust store has removed trust. (Contributed by Christian Heimes in [gh-160040](https://github.com/python/cpython/issues/160040) for [**CVE 2026-115557**](https://www.cve.org/CVERecord?id=CVE-2026-115557).)

### [Table of Contents](../contents.html)

  * What’s new in Python 3.15
    * Summary – Release highlights
    * New features
      * **PEP 810** : Explicit lazy imports
      * **PEP 814** : Add frozendict built-in type
      * **PEP 661** : Add sentinel built-in type
      * **PEP 799** : A dedicated profiling package
      * Tachyon: High-frequency statistical sampling profiler
      * **PEP 831** : Frame pointers enabled by default
      * **PEP 798** : Unpacking in comprehensions
      * **PEP 829** : Package startup configuration files
      * **PEP 803** : Stable ABI for free-threaded builds
      * **PEP 788** : Protecting the C API from interpreter finalization
      * Improved error messages
    * Other language changes
    * Default interactive shell
    * New modules
      * math.integer
    * Improved modules
      * argparse
      * array
      * ast
      * asyncio
      * base64
      * binascii
      * calendar
      * collections
      * concurrent.futures
      * contextlib
      * ctypes
      * dataclasses
      * dbm
      * difflib
      * email
      * faulthandler
      * functools
      * gc
      * hashlib
      * http.client
      * http.server
      * importlib.metadata
      * inspect
      * json
      * locale
      * math
      * mimetypes
      * mmap
      * os
      * os.path
      * pathlib
      * pdb
      * pickle
      * pickletools
      * pprint
      * re
      * resource
      * shelve
      * socket
      * sqlite3
      * ssl
      * subprocess
      * symtable
      * sys
      * sys.monitoring
      * tarfile
      * threading
      * timeit
      * tkinter
      * tokenize
      * tomllib
      * types
      * typing
      * unicodedata
      * unittest
      * urllib.parse
      * venv
      * warnings
      * wave
      * webbrowser
      * xml
      * xml.parsers.expat
      * zlib
    * Optimizations
      * base64 & binascii
      * csv
      * Upgraded experimental JIT compiler
    * Removed
      * ast
      * collections.abc
      * ctypes
      * datetime
      * glob
      * http.server
      * importlib
      * importlib.resources
      * pathlib
      * platform
      * sre_*
      * sysconfig
      * threading
      * types
      * typing
      * wave
      * zipimport
    * Deprecated
      * New deprecations
      * Pending removal in Python 3.16
      * Pending removal in Python 3.17
      * Pending removal in Python 3.18
      * Pending removal in Python 3.19
      * Pending removal in Python 3.20
      * Pending removal in future versions
      * Soft deprecations
    * C API changes
      * New features
      * Changed C APIs
      * Removed C APIs
      * Deprecated C APIs
    * Build changes
    * Porting to Python 3.15
    * Notable changes in 3.15.2
      * importlib
      * ssl

#### Previous topic

[What’s New in Python](index.html "previous chapter")

#### Next topic

[What’s new in Python 3.14](3.14.html "next chapter")

### This page

  * [Report a bug](../bugs.html)
  * [Improve this page](../improve-page-nojs.html)
  * [Show source ](https://github.com/python/cpython/blob/3.15/Doc/whatsnew/3.15.rst?plain=1)

«

### Navigation

  * [index](../genindex.html "General Index")
  * [modules](../py-modindex.html "Python Module Index") |
  * [next](3.14.html "What’s new in Python 3.14") |
  * [previous](index.html "What’s New in Python") |
  * ![Python logo](../_static/py.svg)
  * [Python](https://www.python.org/) »
  *   *   * [3.15.2 documentation](../index.html) »
  * [What’s New in Python](index.html) »
  * [What’s new in Python 3.15]()
  * | 
  * Theme  Auto Light Dark |

(C) [Copyright](../copyright.html) 2001 Python Software Foundation.  
This page is licensed under the Python Software Foundation License Version 2.  
Examples, recipes, and other code in the documentation are additionally
licensed under the Zero Clause BSD License.  
See [History and License](/license.html) for more information.  
  
The Python Software Foundation is a non-profit corporation. [Please
donate.](https://www.python.org/psf/donations/)  
  
Last updated on Nov 24, 2026 (05:07 UTC). [Found a bug](/bugs.html)?  
Created using [Sphinx](https://www.sphinx-doc.org/) 9.1.1.