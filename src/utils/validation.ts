import { isString } from 'formik';

export function minLength(count: number) {
  return function (value: string) {
    return value.length && value.length < count
      ? `Минимальная длина поля составляет ${count} ${
          count % 10 < 5 ? 'символа' : 'символов'
        }`
      : undefined;
  };
}

export function maxLength(count: number) {
  return function (value: string) {
    return value.length > count
      ? `Максимальная длина поля составляет ${count} ${
          count % 10 < 5 ? 'символа' : 'символов'
        }`
      : undefined;
  };
}

export function length(count: number) {
  return function (value: string) {
    return value.length && value.length !== count
      ? `Длина поля должна составлять ${count} ${
          count % 10 < 5 ? 'символа' : 'символов'
        }`
      : undefined;
  };
}

export function required() {
  return function (value: string) {
    return value ? undefined : `Это обязательное поле`;
  };
}

export function validate(value: string, validators: Array<Function>) {
  let error = undefined;
  for (let i = 0; i < validators.length; i++) {
    error = validators[i](value);
    if (error) {
      break;
    }
  }

  return error;
}

export function removeEmptyValidators(object: any) {
  Object.keys(object).forEach(key => {
    if (!object[key]) {
      delete object[key];
    }
  });
}

export function trimAll(object: any) {
  Object.keys(object).forEach(key => {
    object[key] = object[key].trim().replace(/⠀/gi, '');
  });
}
