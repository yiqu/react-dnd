import { startCase } from "lodash";

export const transformColumnName = (colId: string) => {
  let result = colId;
  switch (colId) {
    case "actionEntity": {
      result = 'Entity';
      break;
    }
    case "actionEntitySource": {
      result = 'Source';
      break;
    }
    case "actionEntitySourcePosition": {
      result = 'Source position';
      break;
    }
    case "actionEntityTarget": {
      result = 'Target';
      break;
    }
    case "actionEntityTargetPosition": {
      result = 'Target position';
      break;
    }
    case "actionType": {
      result = 'Action';
      break;
    }
    case "timestamp": {
      result = 'Timestamp';
      break;
    }
    default: {
      result = startCase(colId);
    }
  }
  return result;
};