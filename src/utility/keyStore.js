import RNSecureKeyStore, { ACCESSIBLE } from "react-native-secure-key-store";

async function get(param) {
    try {
        return await RNSecureKeyStore.get(param)
    } catch (e) {
        console.log(e)
        return Promise.resolve();
    }
}

async function set(param, value) {
    return await RNSecureKeyStore.set(param, value, { accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY })
}

async function clear() {
    try {
        // if (await get("access_token")) { RNSecureKeyStore.remove("access_token") }
        // if (await get("user_token")) { RNSecureKeyStore.remove("user_token") }
        RNSecureKeyStore.remove("access_token")
        RNSecureKeyStore.remove("user_token")
    } catch (e) {
        console.log('################################',e)
        return Promise.resolve();
    }
}

export default {
    get,
    set,
    clear
}