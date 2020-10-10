export function isEmpty(str) {
  if (typeof str === "string" && !str.replace(/^\s+/g, "").length) {
    return true;
  }
  return false;
}

export function isUndefined(str) {
  return typeof str === "undefined";
}

export function isNull(str) {
  return str == null;
}

export function isEmptyorUndefinedorNull(str) {
  if (isUndefined(str) || isNull(str) || isEmpty(str)) {
    return true;
  }
  return false;
}

export function isUndefinedOrNull(str) {
  if (isUndefined(str) || isNull(str)) {
    return true;
  }
  return false;
}
