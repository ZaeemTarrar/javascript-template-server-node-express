module.exports = {
  WELCOME: "Welcome to the Node+Express Server",
  URL_NOT_FOUND: "The Following Url does not Exist !",
  RES_FORMAT_ERR: "APIs Response Object Error",
  REQ: (str) => `\`${str}\` is Required`,
  DB: {
    INVALID: (prop, title) => `${prop} is not a valid ${title}`,
  },
  API: {
    POST: {
      COUNT: "Number of Posts",
      ALL_FOUND: "List of all the Posts",
      NONE_FOUND: "No Posts Found",
      FOUND: "Post Found",
      NOT_FOUND: "Post not Found",
      DELETED: "Post has been Deleted",
      NOT_DELETED: "Post could not be Deleted",
      ALL_DELETED: "All Posts have been Deleted",
      NONE_DELETED: "All Posts couldn't be Deleted",
      CREATED: "New Post was Created",
      NOT_CREATED: "New Post couldn't be Created",
      UPDATED: "Post has been Updated",
      NOT_UPDATED: "Post could not be Updated",
    },
  },
};
