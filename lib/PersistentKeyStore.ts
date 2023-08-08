import * as SecureStore from "expo-secure-store";

async function save(key, value) {
  await SecureStore.setItemAsync(key, JSON.stringify(value));
}

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  console.log("result", result);
  return JSON.parse(result);
}

async function deleteValueFor(key) {
  await SecureStore.deleteItemAsync(key);
}

const PersistentKeyStore = {
  save,
  getValueFor,
  deleteValueFor,
};

export default PersistentKeyStore;
