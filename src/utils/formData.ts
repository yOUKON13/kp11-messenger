export function makeFormData(object: any) {
  const formData = new FormData();

  Object.keys(object).forEach(key => {
    formData.set(key, object[key]);
  });

  return formData;
}
