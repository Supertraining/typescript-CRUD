export const ENTITIES = Object.freeze({
  PDF: {
    NAME: "Pdf",
    PROPERTIES: Object.freeze({
      ID: "id",
      CREATED_AT: "createdAt",
      PDF: "pdf",
    }),
  },
  USER: {
    NAME: "User",
    PROPERTIES: Object.freeze({
      ID: "id",
      FULLNAME: "fullname",
      EMAIL: "email",
      PASSWORD: "password",
      IMG: "img",
      ROLES: "roles",
    }),
  },
});
