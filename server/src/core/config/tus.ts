import { Server } from "@tus/server";
import { FileStore } from "@tus/file-store";

export const tusServer = new Server({
  path: "/uploads",
  datastore: new FileStore({ directory: "./shared/files" }),
});