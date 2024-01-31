"use strict";
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

// src/repositories/in-memory/in-memory-faUsuarios-repository.ts
var in_memory_faUsuarios_repository_exports = {};
__export(in_memory_faUsuarios_repository_exports, {
  InMemoryFaUsuariosRepository: () => InMemoryFaUsuariosRepository
});
module.exports = __toCommonJS(in_memory_faUsuarios_repository_exports);
var import_node_crypto = require("crypto");
var InMemoryFaUsuariosRepository = class {
  constructor() {
    this.items = [];
  }
  async findById(id) {
    const faUsuario = this.items.find((item) => item.id === id);
    if (!faUsuario) {
      return null;
    }
    return faUsuario;
  }
  async findByEmail(email) {
    const faUsuario = this.items.find((item) => item.email === email);
    if (!faUsuario) {
      return null;
    }
    return faUsuario;
  }
  async create(data) {
    const faUsuario = {
      id: (0, import_node_crypto.randomUUID)(),
      nome: data.nome,
      email: data.email,
      password_hash: data.password_hash,
      data_nascimento: new Date(data.data_nascimento),
      administrador: false,
      created_at: /* @__PURE__ */ new Date()
    };
    this.items.push(faUsuario);
    return faUsuario;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryFaUsuariosRepository
});
