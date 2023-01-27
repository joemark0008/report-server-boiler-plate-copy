import _ from "lodash";
import update from "immutability-helper";

export const payloadForUpdate = (id: string, payload: object) => {
  let result = {
    id: id,
    ...payload,
  };
  _.forEach(Object.entries(result), ([key, value]) => {
    result = update(result, {
      [key]: {
        $set: {
          set: value,
        },
      },
    });
  });
  return result;
};
