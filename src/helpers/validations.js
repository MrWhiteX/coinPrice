export function validateEmail(text) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(text).toLowerCase());
}

const availableRules = {
  required(value) {
    return value ? "" : "Field Required";
  },

  min(value, rule) {
    return value.length > rule.length
      ? ""
      : `Minimum ${rule.length} characters`;
  },
};

export function validate(rules = [], value) {
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    if (rule instanceof Object) {
      const errorMessage = availableRules[rule.rule](value, rule);
      if (errorMessage) {
        return errorMessage;
      }
    } else {
      const errorMessage = availableRules[rule](value);
      if (errorMessage) {
        return errorMessage;
      }
    }
  }

  return "";
}
