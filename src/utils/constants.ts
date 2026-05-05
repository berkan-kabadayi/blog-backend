export const SHOW_DELETED_TRUE = {
  TRUE: "true",
  ONLY_DELETED: "onlyDeleted",
  FALSE: "false",
};

export const POST_STATUS = {
  PUBLISHED: "published",
  DRAFT: "draft",
  ALL: "all",
};

const ACCESS_SECONDS = 60 * 60;
const REFRESH_SECONDS = 60 * 60 * 24 * 7;

export const JWT_EXPIRATION = {
  ACCESS_S: ACCESS_SECONDS,
  REFRESH_S: REFRESH_SECONDS,

  ACCESS_MS: ACCESS_SECONDS * 1000,
  REFRESH_MS: REFRESH_SECONDS * 1000,
};
