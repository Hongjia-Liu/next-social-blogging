import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
	getFirestore,
	collection,
	where,
	getDocs,
	query,
	limit,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyBrGz908SOr2vMb3_BEwRKiL1-R2uk2v1I",
	authDomain: "next-social-blogging.firebaseapp.com",
	projectId: "next-social-blogging",
	storageBucket: "next-social-blogging.appspot.com",
	messagingSenderId: "596203439979",
	appId: "1:596203439979:web:73ce1d9ae1fe38a5c66e2e",
	measurementId: "G-H47SZVN6H9",
};

function createFirebaseApp(config) {
	try {
		return getApp();
	} catch {
		return initializeApp(config);
	}
}

// const firebaseApp = initializeApp(firebaseConfig);
const firebaseApp = createFirebaseApp(firebaseConfig);

// Auth exports
// export const auth = firebase.auth();
export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();

// Firestore exports
export const firestore = getFirestore(firebaseApp);
// export const firestore = firebase.firestore();
// export { firestore };
// export const serverTimestamp = serverTimestamp;
// export const fromMillis = fromMillis;
// export const increment = increment;

// Storage exports
export const storage = getStorage(firebaseApp);
export const STATE_CHANGED = "state_changed";

/// Helper functions

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
	// const usersRef = collection(firestore, 'users');
	// const query = usersRef.where('username', '==', username).limit(1);

	const q = query(
		collection(firestore, "users"),
		where("username", "==", username),
		limit(1)
	);
	const userDoc = (await getDocs(q)).docs[0];
	return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
	const data = doc.data();
	return {
		...data,
		// Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
		createdAt: data?.createdAt.toMillis() || 0,
		updatedAt: data?.updatedAt.toMillis() || 0,
	};
}
