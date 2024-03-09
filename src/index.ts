/// <reference types="levi-satori" />

const s = LeviSatori;

export interface UserID {
  platform?: string;
  id: string;
}

export function toUserID(str: string): UserID {
  if (!str.includes(':')) return { platform: undefined, id: str };
  const [platform, ...id] = str.split(':');
  return { platform: platform ?? undefined, id: id.join(':') };
}

declare global {
  namespace LeviSatori {
    interface Context {
      su: Su;
    }
  }
}

export class Su extends s.Service {
  constructor(
    ctx: LeviSatori.Context,
    public config: Su.Config
  ) {
    super(ctx as any, 'su', true);
  }

  isSu(id: string | UserID) {
    const parsed = typeof id === 'string' ? toUserID(id) : id;
    return this.config.superusers.some((it) => {
      if (it.platform && parsed.platform && it.platform !== parsed.platform)
        return false;
      return it.id === parsed.id;
    });
  }
}

export const userIDSchema = s.Schema.object({
  platform: s.Schema.string(),
  id: s.Schema.string(),
});

export const userIDListSchema = s.Schema.union([
  s.Schema.array(userIDSchema),
  s.Schema.transform(s.Schema.array(s.Schema.string()), (arr) =>
    arr.map(toUserID)
  ),
]);

export namespace Su {
  export interface Config {
    superusers: UserID[];
  }

  export const Config: LeviSatori.Schema<Su.Config> = s.Schema.object({
    superusers: userIDListSchema,
  });
}

export default Su;
