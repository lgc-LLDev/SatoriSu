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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Su: () => Su,
  default: () => src_default,
  toUserID: () => toUserID,
  userIDListSchema: () => userIDListSchema,
  userIDSchema: () => userIDSchema
});
module.exports = __toCommonJS(src_exports);
var s = globalThis.LeviSatori;
function toUserID(str) {
  if (!str.includes(":"))
    return { platform: void 0, id: str };
  const [platform, ...id] = str.split(":");
  return { platform: platform ?? void 0, id: id.join(":") };
}
var Su = class extends s.Service {
  constructor(ctx, config) {
    super(ctx, "su", true);
    this.config = config;
  }
  isSu(id) {
    const parsed = typeof id === "string" ? toUserID(id) : id;
    return this.config.superusers.some((it) => {
      if (it.platform && parsed.platform && it.platform !== parsed.platform)
        return false;
      return it.id === parsed.id;
    });
  }
};
var userIDSchema = s.Schema.object({
  platform: s.Schema.string(),
  id: s.Schema.string()
});
var userIDListSchema = s.Schema.union([
  s.Schema.array(userIDSchema),
  s.Schema.transform(
    s.Schema.array(s.Schema.string()),
    (arr) => arr.map(toUserID)
  )
]);
((Su2) => {
  Su2.Config = s.Schema.object({
    superusers: userIDListSchema
  });
})(Su || (Su = {}));
var src_default = Su;
