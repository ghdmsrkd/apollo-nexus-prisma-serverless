import { inputObjectType, objectType } from "nexus";

export const account = objectType({
  name: 'account',
  definition(t) {
    t.model.id()
  }
})