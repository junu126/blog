const DEV_ENVS = ["development", "test"] as const;

export function isDev() {
  const nodeEnv = process?.env?.NODE_ENV;
  if (nodeEnv === null || nodeEnv === undefined) {
    return true;
  }

  return DEV_ENVS.includes(nodeEnv as (typeof DEV_ENVS)[number]);
}
