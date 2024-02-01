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

// src/http/middlewares/verifyGym-jwt.ts
var verifyGym_jwt_exports = {};
__export(verifyGym_jwt_exports, {
  verifyGymJwt: () => verifyGymJwt
});
module.exports = __toCommonJS(verifyGym_jwt_exports);
async function verifyGymJwt(request, reply) {
  try {
    await request.gymVerify();
  } catch (err) {
    return reply.status(401).send({ message: "Unauthorized." });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  verifyGymJwt
});
