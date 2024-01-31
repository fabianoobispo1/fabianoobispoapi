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

// src/http/controllers/app_fa/faUsuarios/faRegister.ts
var faRegister_exports = {};
__export(faRegister_exports, {
  faRegister: () => faRegister
});
module.exports = __toCommonJS(faRegister_exports);
var import_zod2 = require("zod");

// src/use-cases/errors/user-already-exists-error.ts
var UserAlreadyExistsError = class extends Error {
  constructor() {
    super("E-mail ja existe.");
  }
};

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

// src/use-cases/faUsuarioRegister.ts
var import_bcryptjs = require("bcryptjs");
var FaUsuarioRegister = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({ nome, email, password, data_nascimento }) {
    const password_hash = await (0, import_bcryptjs.hash)(password, 6);
    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }
    const faUsuario = await this.usersRepository.create({
      nome,
      email,
      password_hash,
      data_nascimento
    });
    return {
      faUsuario
    };
  }
};

// src/use-cases/factories/make-faUsuario-use-case.ts
function makefaUsuarioRegister() {
  const faUsuarioRepository = new PrismaFausuarioRepository();
  const useCase = new FaUsuarioRegister(faUsuarioRepository);
  return useCase;
}

// src/http/controllers/app_fa/faUsuarios/faRegister.ts
async function faRegister(request, reply) {
  const registerBodySchema = import_zod2.z.object({
    nome: import_zod2.z.string(),
    data_nascimento: import_zod2.z.string().datetime(),
    email: import_zod2.z.string().email(),
    password: import_zod2.z.string().min(6)
  });
  const { nome, email, password, data_nascimento } = registerBodySchema.parse(request.body);
  try {
    const faUsuarioRegister = makefaUsuarioRegister();
    await faUsuarioRegister.execute({
      nome,
      email,
      password,
      data_nascimento
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ mesage: err.message });
    }
    throw err;
  }
  return reply.status(201).send();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  faRegister
});
