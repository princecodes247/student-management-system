import * as SecureStore from "expo-secure-store";

async function save(key, value) {
  await SecureStore.setItemAsync(key, JSON.stringify(value));
}

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  return JSON.parse(result);
}

async function deleteValueFor(key) {
  await SecureStore.deleteItemAsync(key);
}

export default {
  save,
  getValueFor,
  deleteValueFor,
};
