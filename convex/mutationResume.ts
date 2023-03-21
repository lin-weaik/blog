import { Id } from "./_generated/dataModel";
import { mutation } from "./_generated/server";

export default mutation(async ({ db }, context: string, id?: string | null) => {
  if (id) {
  return await db.patch(new Id('resumes', id), { context })
  }
  return await db.insert('resumes', { context })
});
