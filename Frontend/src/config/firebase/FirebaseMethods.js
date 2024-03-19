import app from "./FirebaseConfig";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage(app);


// Upload File in Firebase Storage
let uploadFile = (name, file) => {
    return new Promise((resolve, reject) => {

        // Uploading Profile Picture
        const storageRef = ref(storage, name);

        uploadBytes(storageRef, file)
            .then((res) => {

                // GEtting Profile Picture URL
                getDownloadURL(storageRef)
                    .then((url) => {
                        resolve(url);
                    })
                    .catch((rej) => {
                        reject(rej);
                    })
            })
            .catch((rej) => {
                reject(rej)
            })
    })
}


export default uploadFile;