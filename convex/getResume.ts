import { Id } from "./_generated/dataModel";
import { query } from "./_generated/server";

export default query(async ({ db }, id: string | null) => {
  if (!id) {
    return null
  }
  return await db.get(new Id('resumes', id));
});
