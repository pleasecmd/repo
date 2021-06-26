# Repo structure

Proposed repository structure:

```
repo/
├─ commands/
│  ├─ ${command}/
│  │  ├─ build/
│  │  │  ├─ ${os}.${variant}.${release}.${arch}.js
│  │  ├─ install/
│  │  │  ├─ ${os}.${variant}.${release}.${arch}.js
│  │  ├─ prebuilt/
│  │  │  ├─ ${os}.${variant}.${release}.${arch}.js
│  │  ├─ script/
│  │  │  ├─ ${os}.${variant}.${release}.${arch}.js
├─ configs/
│  ├─ ${os}.${variant}.${release}.${arch}.js
```

Where:

1. `os` is the OS name, type, class or family (eg. `windows`, `macos`, `bsd`, `linux` or `any`)
2. `variant` is the distribution, variant or version (eg. `10`, `ubuntu`, `debian`, `freebsd` or `any`)
3. `release` is the version, release or build number (eg. `18363`, `20.04`, `10` or `any`)
4. `arch` is the cpu architecture (eg. `arm64`, `x64`, or `any`)

The program should first try the exact values for each of the parameters, then switch to `any` one parameter at a time from right to left.

File check order for config or command files is as follows:

1. ${os}.${variant}.${release}.${arch}
2. ${os}.${variant}.${release}.any
3. ${os}.${variant}.any.${arch}
4. ${os}.${variant}.any.any
5. ${os}.any.any.any
6. any.any.any.any

To obtain each of the parameters, the following methods are used:

1. `os`, is one of `windows`, `macos`, `bsd`, `linux` or `any`
2. `variant` depends on the os class:
   2.1. For `windows` it is the `major.minor` part of `major.minor.build` value reported by `os.release()`
   2.2. For `linux` it is the name reported by `getos` npm library, lower-cased and whitespaces removed.
   2.3. For `macos` it is the name reported by `macos-release` npm library, lower-cased and whitespaces removed.
   2.4. For `bsd`, it is either `freebsd` or `openbsd`, as reported by `os.platform()`
3. `release` depends on the os class:
   3.1. For `windows` it is the `build` part of `major.minor.build` value reported by `os.release()`
   3.2. For `linux` it is the release field reported by `getos` npm library.
   3.3. For `macos` it is the value reported by `os.release()`, which matches the darwin kernel version number.
   3.4. For `bsd` it is the value reported by `os.release()`
4. `arch` paramter is the value reported by `os.arch()`
