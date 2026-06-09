export const id = 288;
export const ids = [288];
export const modules = {

/***/ 9578:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var constants_exports = {};
__export(constants_exports, {
  CLOUDFLARED_VERSION: () => CLOUDFLARED_VERSION,
  DEFAULT_CLOUDFLARED_BIN: () => DEFAULT_CLOUDFLARED_BIN,
  RELEASE_BASE: () => RELEASE_BASE,
  bin: () => bin,
  use: () => use
});
module.exports = __toCommonJS(constants_exports);
var import_node_path = __toESM(__webpack_require__(6760));
const DEFAULT_CLOUDFLARED_BIN = import_node_path.default.join(
  __dirname,
  "..",
  "bin",
  process.platform === "win32" ? "cloudflared.exe" : "cloudflared"
);
let bin = process.env.CLOUDFLARED_BIN || DEFAULT_CLOUDFLARED_BIN;
function use(executable) {
  bin = executable;
}
const CLOUDFLARED_VERSION = process.env.CLOUDFLARED_VERSION || "latest";
const RELEASE_BASE = "https://github.com/cloudflare/cloudflared/releases/";
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 4645:
/***/ ((module) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var error_exports = {};
__export(error_exports, {
  UnsupportedError: () => UnsupportedError
});
module.exports = __toCommonJS(error_exports);
class UnsupportedError extends Error {
  constructor(message) {
    super(message);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 9735:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var handler_exports = {};
__export(handler_exports, {
  ConfigHandler: () => ConfigHandler,
  ConnectionHandler: () => ConnectionHandler,
  TryCloudflareHandler: () => TryCloudflareHandler
});
module.exports = __toCommonJS(handler_exports);
var import_node_stream = __webpack_require__(7075);
var import_regex = __webpack_require__(144);
class ConnectionHandler {
  constructor(tunnel) {
    this.connections = [];
    this.connected_handler = (output, tunnel) => {
      const conn_match = output.match(import_regex.conn_regex);
      const ip_match = output.match(import_regex.ip_regex);
      const location_match = output.match(import_regex.location_regex);
      const index_match = output.match(import_regex.index_regex);
      if (conn_match && ip_match && location_match && index_match) {
        const connection = {
          id: conn_match[1],
          ip: ip_match[1],
          location: location_match[1]
        };
        this.connections[Number(index_match[1])] = connection;
        tunnel.emit("connected", connection);
      }
    };
    this.disconnected_handler = (output, tunnel) => {
      const index_match = output.includes("terminated") ? output.match(import_regex.index_regex) : null;
      if (index_match) {
        const index = Number(index_match[1]);
        if (this.connections[index]) {
          tunnel.emit("disconnected", this.connections[index]);
          this.connections[index] = void 0;
        }
      }
    };
    tunnel.addHandler(this.connected_handler.bind(this));
    tunnel.addHandler(this.disconnected_handler.bind(this));
  }
}
class TryCloudflareHandler {
  constructor(tunnel) {
    this.url_handler = (output, tunnel) => {
      const url_match = output.match(/https:\/\/([a-z0-9-]+)\.trycloudflare\.com/);
      if (url_match) {
        tunnel.emit("url", url_match[0]);
      }
    };
    tunnel.addHandler(this.url_handler.bind(this));
  }
}
class ConfigHandler extends import_node_stream.EventEmitter {
  constructor(tunnel) {
    super();
    this.config_handler = (output, tunnel) => {
      const config_match = output.match(/\bconfig="(.+?)" version=(\d+)/);
      if (config_match) {
        try {
          const config_str = config_match[1].replace(/\\"/g, '"');
          const config = JSON.parse(config_str);
          const version = parseInt(config_match[2], 10);
          this.emit("config", {
            config,
            version
          });
          if (config && typeof config === "object" && "ingress" in config && Array.isArray(config.ingress)) {
            for (const ingress of config.ingress) {
              if ("hostname" in ingress) {
                tunnel.emit("url", ingress.hostname);
              }
            }
          }
        } catch (error) {
          this.emit("error", new Error(`Failed to parse config: ${error}`));
        }
      }
    };
    tunnel.addHandler(this.config_handler.bind(this));
  }
  on(event, listener) {
    return super.on(event, listener);
  }
  once(event, listener) {
    return super.once(event, listener);
  }
  off(event, listener) {
    return super.off(event, listener);
  }
  emit(event, ...args) {
    return super.emit(event, ...args);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 4924:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var install_exports = {};
__export(install_exports, {
  install: () => install,
  install_linux: () => install_linux,
  install_macos: () => install_macos,
  install_windows: () => install_windows
});
module.exports = __toCommonJS(install_exports);
var import_node_fs = __toESM(__webpack_require__(3024));
var import_node_path = __toESM(__webpack_require__(6760));
var import_node_https = __toESM(__webpack_require__(4708));
var import_node_child_process = __webpack_require__(1421);
var import_constants = __webpack_require__(9578);
var import_error = __webpack_require__(4645);
const LINUX_URL = {
  arm64: "cloudflared-linux-arm64",
  arm: "cloudflared-linux-arm",
  x64: "cloudflared-linux-amd64",
  ia32: "cloudflared-linux-386"
};
const MACOS_URL = {
  arm64: "cloudflared-darwin-arm64.tgz",
  x64: "cloudflared-darwin-amd64.tgz"
};
const WINDOWS_URL = {
  x64: "cloudflared-windows-amd64.exe",
  ia32: "cloudflared-windows-386.exe"
};
function resolve_base(version) {
  if (version === "latest") {
    return `${import_constants.RELEASE_BASE}latest/download/`;
  }
  return `${import_constants.RELEASE_BASE}download/${version}/`;
}
async function install(to, version = import_constants.CLOUDFLARED_VERSION) {
  if (process.platform === "linux") {
    return install_linux(to, version);
  } else if (process.platform === "darwin") {
    return install_macos(to, version);
  } else if (process.platform === "win32") {
    return install_windows(to, version);
  } else {
    throw new import_error.UnsupportedError("Unsupported platform: " + process.platform);
  }
}
async function install_linux(to, version = import_constants.CLOUDFLARED_VERSION) {
  const file = LINUX_URL[process.arch];
  if (file === void 0) {
    throw new import_error.UnsupportedError("Unsupported architecture: " + process.arch);
  }
  await download(resolve_base(version) + file, to);
  import_node_fs.default.chmodSync(to, "755");
  return to;
}
async function install_macos(to, version = import_constants.CLOUDFLARED_VERSION) {
  let arch = process.arch;
  if (version !== "latest" && version_number(version) < 20240802) {
    arch = "x64";
  }
  const file = MACOS_URL[arch];
  if (file === void 0) {
    throw new import_error.UnsupportedError("Unsupported architecture: " + arch);
  }
  await download(resolve_base(version) + file, `${to}.tgz`);
  process.env.VERBOSE && console.log(`Extracting to ${to}`);
  (0, import_node_child_process.execSync)(`tar -xzf ${import_node_path.default.basename(`${to}.tgz`)}`, { cwd: import_node_path.default.dirname(to) });
  import_node_fs.default.unlinkSync(`${to}.tgz`);
  import_node_fs.default.renameSync(`${import_node_path.default.dirname(to)}/cloudflared`, to);
  return to;
}
async function install_windows(to, version = import_constants.CLOUDFLARED_VERSION) {
  const file = WINDOWS_URL[process.arch];
  if (file === void 0) {
    throw new import_error.UnsupportedError("Unsupported architecture: " + process.arch);
  }
  await download(resolve_base(version) + file, to);
  return to;
}
function download(url, to, redirect = 0) {
  if (redirect === 0) {
    process.env.VERBOSE && console.log(`Downloading ${url} to ${to}`);
  } else {
    process.env.VERBOSE && console.log(`Redirecting to ${url}`);
  }
  if (!import_node_fs.default.existsSync(import_node_path.default.dirname(to))) {
    import_node_fs.default.mkdirSync(import_node_path.default.dirname(to), { recursive: true });
  }
  return new Promise((resolve, reject) => {
    const request = import_node_https.default.get(url, (res) => {
      const redirect_code = [301, 302, 303, 307, 308];
      if (redirect_code.includes(res.statusCode) && res.headers.location !== void 0) {
        request.destroy();
        const redirection = res.headers.location;
        resolve(download(redirection, to, redirect + 1));
        return;
      }
      if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
        const file = import_node_fs.default.createWriteStream(to);
        file.on("finish", () => {
          file.close(() => resolve(to));
        });
        file.on("error", (err) => {
          import_node_fs.default.unlink(to, () => reject(err));
        });
        res.pipe(file);
      } else {
        request.destroy();
        reject(new Error(`HTTP response with status code: ${res.statusCode}`));
      }
    });
    request.on("error", (err) => {
      reject(err);
    });
    request.end();
  });
}
function version_number(semver) {
  const [major, minor, patch] = semver.split(".").map(Number);
  return major * 1e4 + minor * 100 + patch;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 8288:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var lib_exports = {};
__export(lib_exports, {
  AlreadyInstalledError: () => import_service.AlreadyInstalledError,
  MACOS_SERVICE_PATH: () => import_service.MACOS_SERVICE_PATH,
  NotInstalledError: () => import_service.NotInstalledError,
  identifier: () => import_service.identifier,
  service: () => import_service.service
});
module.exports = __toCommonJS(lib_exports);
__reExport(lib_exports, __webpack_require__(9578), module.exports);
__reExport(lib_exports, __webpack_require__(4924), module.exports);
__reExport(lib_exports, __webpack_require__(8049), module.exports);
var import_service = __webpack_require__(5660);
__reExport(lib_exports, __webpack_require__(9735), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 144:
/***/ ((module) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var regex_exports = {};
__export(regex_exports, {
  config_regex: () => config_regex,
  conn_regex: () => conn_regex,
  connectorID_regex: () => connectorID_regex,
  disconnect_regex: () => disconnect_regex,
  index_regex: () => index_regex,
  ip_regex: () => ip_regex,
  location_regex: () => location_regex,
  metrics_regex: () => metrics_regex,
  tunnelID_regex: () => tunnelID_regex
});
module.exports = __toCommonJS(regex_exports);
const conn_regex = /connection[= ]([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12})/i;
const ip_regex = /ip=([0-9.]+)/;
const location_regex = /location=([A-Za-z0-9]+)/;
const index_regex = /connIndex=(\d)/;
const disconnect_regex = /Unregistered tunnel connection connIndex=(\d)/i;
const tunnelID_regex = /tunnelID=([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12})/i;
const connectorID_regex = /Connector ID: ([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12})/i;
const metrics_regex = /metrics server on ([0-9.:]+\/metrics)/;
const config_regex = /config="(.+[^\\])"/;
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 5660:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var service_exports = {};
__export(service_exports, {
  AlreadyInstalledError: () => AlreadyInstalledError,
  LINUX_SERVICE_PATH: () => LINUX_SERVICE_PATH,
  MACOS_SERVICE_PATH: () => MACOS_SERVICE_PATH,
  NotInstalledError: () => NotInstalledError,
  clean: () => clean,
  current: () => current,
  err: () => err,
  exists: () => exists,
  identifier: () => identifier,
  install: () => install,
  journal: () => journal,
  log: () => log,
  service: () => service,
  service_name: () => service_name,
  uninstall: () => uninstall
});
module.exports = __toCommonJS(service_exports);
var import_node_os = __toESM(__webpack_require__(8161));
var import_node_fs = __toESM(__webpack_require__(3024));
var import_node_child_process = __webpack_require__(1421);
var import_constants = __webpack_require__(9578);
var import_regex = __webpack_require__(144);
const identifier = "com.cloudflare.cloudflared";
const service_name = "cloudflared.service";
const MACOS_SERVICE_PATH = {
  PLIST: is_root() ? `/Library/LaunchDaemons/${identifier}.plist` : `${import_node_os.default.homedir()}/Library/LaunchAgents/${identifier}.plist`,
  OUT: is_root() ? `/Library/Logs/${identifier}.out.log` : `${import_node_os.default.homedir()}/Library/Logs/${identifier}.out.log`,
  ERR: is_root() ? `/Library/Logs/${identifier}.err.log` : `${import_node_os.default.homedir()}/Library/Logs/${identifier}.err.log`
};
const LINUX_SERVICE_PATH = {
  SYSTEMD: `/etc/systemd/system/${service_name}`,
  SERVICE: "/etc/init.d/cloudflared",
  SERVICE_OUT: "/var/log/cloudflared.log",
  SERVICE_ERR: "/var/log/cloudflared.err"
};
const service = { install, uninstall, exists, log, err, current, clean, journal };
class AlreadyInstalledError extends Error {
  constructor() {
    super("service is already installed");
  }
}
class NotInstalledError extends Error {
  constructor() {
    super("service is not installed");
  }
}
function install(token) {
  if (!["darwin", "linux"].includes(process.platform)) {
    throw new Error(`Not Implemented on platform ${process.platform}`);
  }
  if (exists()) {
    throw new AlreadyInstalledError();
  }
  const args = ["service", "install"];
  if (token) {
    args.push(token);
  }
  const result = (0, import_node_child_process.spawnSync)(import_constants.bin, args);
  if (result.status !== 0) {
    throw new Error(`service install failed: ${result.stderr.toString()}`);
  }
}
function uninstall() {
  if (!["darwin", "linux"].includes(process.platform)) {
    throw new Error(`Not Implemented on platform ${process.platform}`);
  }
  if (!exists()) {
    throw new NotInstalledError();
  }
  const result = (0, import_node_child_process.spawnSync)(import_constants.bin, ["service", "uninstall"]);
  if (result.status !== 0) {
    throw new Error(`service uninstall failed: ${result.stderr.toString()}`);
  }
  if (process.platform === "darwin") {
    import_node_fs.default.rmSync(MACOS_SERVICE_PATH.OUT);
    import_node_fs.default.rmSync(MACOS_SERVICE_PATH.ERR);
  } else if (process.platform === "linux" && !is_systemd()) {
    import_node_fs.default.rmSync(LINUX_SERVICE_PATH.SERVICE_OUT);
    import_node_fs.default.rmSync(LINUX_SERVICE_PATH.SERVICE_ERR);
  }
}
function log() {
  if (!exists()) {
    throw new NotInstalledError();
  }
  if (process.platform === "darwin") {
    return import_node_fs.default.readFileSync(MACOS_SERVICE_PATH.OUT, "utf8");
  }
  if (process.platform === "linux" && !is_systemd()) {
    return import_node_fs.default.readFileSync(LINUX_SERVICE_PATH.SERVICE_OUT, "utf8");
  }
  throw new Error(`Not Implemented on platform ${process.platform}`);
}
function err() {
  if (!exists()) {
    throw new NotInstalledError();
  }
  if (process.platform === "darwin") {
    return import_node_fs.default.readFileSync(MACOS_SERVICE_PATH.ERR, "utf8");
  }
  if (process.platform === "linux" && !is_systemd()) {
    return import_node_fs.default.readFileSync(LINUX_SERVICE_PATH.SERVICE_ERR, "utf8");
  }
  throw new Error(`Not Implemented on platform ${process.platform}`);
}
function journal(n = 300) {
  if (process.platform === "linux" && is_systemd()) {
    const args = ["-u", service_name, "-o", "cat", "-n", n.toString()];
    return (0, import_node_child_process.spawnSync)("journalctl", args).stdout.toString();
  }
  throw new Error(`Not Implemented on platform ${process.platform}`);
}
function current() {
  var _a, _b, _c, _d;
  if (!["darwin", "linux"].includes(process.platform)) {
    throw new Error(`Not Implemented on platform ${process.platform}`);
  }
  if (!exists()) {
    throw new NotInstalledError();
  }
  const log2 = is_systemd() ? journal() : err();
  let tunnelID = "";
  let connectorID = "";
  const connections = [];
  let metrics = "";
  let config = {};
  for (const line of log2.split("\n")) {
    try {
      if (line.match(import_regex.tunnelID_regex)) {
        tunnelID = ((_a = line.match(import_regex.tunnelID_regex)) == null ? void 0 : _a[1]) ?? "";
      } else if (line.match(import_regex.connectorID_regex)) {
        connectorID = ((_b = line.match(import_regex.connectorID_regex)) == null ? void 0 : _b[1]) ?? "";
      } else if (line.match(import_regex.conn_regex) && line.match(import_regex.location_regex) && line.match(import_regex.ip_regex) && line.match(import_regex.index_regex)) {
        const [, id] = line.match(import_regex.conn_regex) ?? [];
        const [, location] = line.match(import_regex.location_regex) ?? [];
        const [, ip] = line.match(import_regex.ip_regex) ?? [];
        const [, idx] = line.match(import_regex.index_regex) ?? [];
        connections[parseInt(idx)] = { id, ip, location };
      } else if (line.match(import_regex.disconnect_regex)) {
        const [, idx] = line.match(import_regex.disconnect_regex) ?? [];
        if (parseInt(idx) in connections) {
          connections[parseInt(idx)] = { id: "", ip: "", location: "" };
        }
      } else if (line.match(import_regex.metrics_regex)) {
        metrics = ((_c = line.match(import_regex.metrics_regex)) == null ? void 0 : _c[1]) ?? "";
      } else if (line.match(import_regex.config_regex)) {
        config = JSON.parse(((_d = line.match(import_regex.config_regex)) == null ? void 0 : _d[1].replace(/\\/g, "")) ?? "{}");
      }
    } catch (err2) {
      if (process.env.VERBOSE) {
        console.error("log parsing failed", err2);
      }
    }
  }
  return { tunnelID, connectorID, connections, metrics, config };
}
function clean() {
  if (process.platform !== "darwin") {
    throw new Error(`Not Implemented on platform ${process.platform}`);
  }
  if (exists()) {
    throw new AlreadyInstalledError();
  }
  import_node_fs.default.rmSync(MACOS_SERVICE_PATH.OUT, { force: true });
  import_node_fs.default.rmSync(MACOS_SERVICE_PATH.ERR, { force: true });
}
function exists() {
  if (process.platform === "darwin") {
    return import_node_fs.default.existsSync(MACOS_SERVICE_PATH.PLIST);
  } else if (process.platform === "linux") {
    return is_systemd() ? import_node_fs.default.existsSync(LINUX_SERVICE_PATH.SYSTEMD) : import_node_fs.default.existsSync(LINUX_SERVICE_PATH.SERVICE);
  }
  throw new Error(`Not Implemented on platform ${process.platform}`);
}
function is_root() {
  var _a;
  return ((_a = process.getuid) == null ? void 0 : _a.call(process)) === 0;
}
function is_systemd() {
  return process.platform === "linux" && import_node_fs.default.existsSync("/run/systemd/system");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 8049:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var tunnel_exports = {};
__export(tunnel_exports, {
  Tunnel: () => Tunnel,
  build_args: () => build_args,
  build_options: () => build_options,
  tunnel: () => tunnel
});
module.exports = __toCommonJS(tunnel_exports);
var import_node_child_process = __webpack_require__(1421);
var import_node_events = __webpack_require__(8474);
var import_constants = __webpack_require__(9578);
var import_handler = __webpack_require__(9735);
class Tunnel extends import_node_events.EventEmitter {
  constructor(options = ["tunnel", "--hello-world"]) {
    super();
    this.outputHandlers = [];
    this.stop = this._stop.bind(this);
    this.setupDefaultHandlers();
    const args = Array.isArray(options) ? options : build_args(options);
    this._process = this.createProcess(args);
    this.setupEventHandlers();
  }
  get process() {
    return this._process;
  }
  setupDefaultHandlers() {
    new import_handler.ConnectionHandler(this);
    new import_handler.TryCloudflareHandler(this);
  }
  /**
   * Add a custom output handler
   * @param handler Function to handle cloudflared output
   */
  addHandler(handler) {
    this.outputHandlers.push(handler);
  }
  /**
   * Remove a previously added output handler
   * @param handler The handler to remove
   */
  removeHandler(handler) {
    const index = this.outputHandlers.indexOf(handler);
    if (index !== -1) {
      this.outputHandlers.splice(index, 1);
    }
  }
  processOutput(output) {
    for (const handler of this.outputHandlers) {
      try {
        handler(output, this);
      } catch (error) {
        this.emit("error", error instanceof Error ? error : new Error(String(error)));
      }
    }
  }
  setupEventHandlers() {
    this.on("stdout", (output) => {
      this.processOutput(output);
    });
    this.on("stderr", (output) => {
      this.processOutput(output);
    });
  }
  createProcess(args) {
    var _a, _b;
    const child = (0, import_node_child_process.spawn)(import_constants.bin, args, { stdio: ["ignore", "pipe", "pipe"] });
    child.on("error", (error) => this.emit("error", error));
    child.on("exit", (code, signal) => this.emit("exit", code, signal));
    if (process.env.VERBOSE) {
      child.stdout.pipe(process.stdout);
      child.stderr.pipe(process.stderr);
    }
    (_a = child.stdout) == null ? void 0 : _a.on("data", (data) => this.emit("stdout", data.toString()));
    (_b = child.stderr) == null ? void 0 : _b.on("data", (data) => this.emit("stderr", data.toString()));
    return child;
  }
  _stop() {
    return this.process.kill("SIGINT");
  }
  on(event, listener) {
    return super.on(event, listener);
  }
  once(event, listener) {
    return super.once(event, listener);
  }
  off(event, listener) {
    return super.off(event, listener);
  }
  emit(event, ...args) {
    return super.emit(event, ...args);
  }
  /**
   * Create a quick tunnel without a Cloudflare account.
   * @param url The local service URL to connect to. If not provided, the hello world mode will be used.
   * @param options The options to pass to cloudflared.
   */
  static quick(url, options = {}) {
    const args = ["tunnel"];
    if (url) {
      args.push("--url", url);
    } else {
      args.push("--hello-world");
    }
    args.push(...build_options(options));
    return new Tunnel(args);
  }
  /**
   * Create a tunnel with a Cloudflare account.
   * @param token The Cloudflare Tunnel token.
   * @param options The options to pass to cloudflared.
   */
  static withToken(token, options = {}) {
    options["--token"] = token;
    return new Tunnel(build_args(options));
  }
}
function tunnel(options = {}) {
  return new Tunnel(options);
}
function build_args(options) {
  const args = "--hello-world" in options ? ["tunnel"] : ["tunnel", "run"];
  args.push(...build_options(options));
  return args;
}
function build_options(options) {
  const opts = [];
  for (const [key, value] of Object.entries(options)) {
    if (typeof value === "string") {
      opts.push(`${key}`, value);
    } else if (typeof value === "number") {
      opts.push(`${key}`, value.toString());
    } else if (typeof value === "boolean") {
      if (value === true) {
        opts.push(`${key}`);
      }
    }
  }
  return opts;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ })

};

//# sourceMappingURL=288.index.js.map