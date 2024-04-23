export function objectToFormData(obj: Record<string, unknown>): FormData {
  const formData = new FormData();
  for (const key in obj) {
    const value = obj[key];
    formData.append(key, value as string);
  }
  return formData;
}
