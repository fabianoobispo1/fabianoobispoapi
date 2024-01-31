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

// src/use-cases/factories/make-get-faUsuario-perfil-use.case.ts
var make_get_faUsuario_perfil_use_case_exports = {};
__export(make_get_faUsuario_perfil_use_case_exports, {
  makeGetFaUsiarioPerfilUseCase: () => makeGetFaUsiarioPerfilUseCase
});
module.exports = __toCommonJS(make_get_faUsuario_perfil_use_case_exports);

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["dev", "test", "production"]).default("dev"),
  JWT_SECRET_GYM: import_zod.z.string(),
  JWT_SECRET_FA: import_zod.z.string(),
  PORT: import_zod.z.coerce.number().default(8080)
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.log("\u274C invalid environment variables.", _env.error.format());
  throw new Error("invalid environment variables.");
}
var env = _env.data;

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query"] : []
});

// src/repositories/prisma/prisma-faUsuario-repository.ts
var PrismaFausuarioRepository = class {
  async findByEmail(email) {
    const user = await prisma.faUsuario.findUnique({
      where: {
        email
      }
    });
    return user;
  }
  async create(data) {
    const user = await prisma.faUsuario.create({
      data
    });
    return user;
  }
  async findById(id) {
    const user = await prisma.faUsuario.findUnique({
      where: {
        id
      }
    });
    return user;
  }
};

// src/use-cases/errors/resource-not-found-error.ts
var ResourceNotFoundError = class extends Error {
  constructor() {
    super("Resource not found.");
  }
};

// src/use-cases/get-faUsuario-perfil.ts
var GetFaUsuarioPerfilUseCase = class {
  constructor(faUsuarioRepository) {
    this.faUsuarioRepository = faUsuarioRepository;
  }
  async execute({
    userId
  }) {
    const faUsuario = await this.faUsuarioRepository.findById(userId);
    if (!faUsuario) {
      throw new ResourceNotFoundError();
    }
    return {
      faUsuario
    };
  }
};

// src/use-cases/factories/make-get-faUsuario-perfil-use.case.ts
function makeGetFaUsiarioPerfilUseCase() {
  const faUsuarioRepository = new PrismaFausuarioRepository();
  const useCase = new GetFaUsuarioPerfilUseCase(faUsuarioRepository);
  return useCase;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeGetFaUsiarioPerfilUseCase
});
