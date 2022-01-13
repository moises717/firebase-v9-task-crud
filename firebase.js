import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";

import {
	collection,
	getFirestore,
	addDoc,
	getDocs,
	deleteDoc,
	onSnapshot,
	doc,
	getDoc,
	updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

const firebaseConfig = {
	// your firebase credentials
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const saveTask = (title, description) => addDoc(collection(db, "tasks"), { title, description });

export const getTasks = () => getDocs(collection(db, "tasks"));

export const onGetTasks = (callback) => onSnapshot(collection(db, "tasks"), callback);

export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

export const getTask = (id) => getDoc(doc(db, "tasks", id));

export const editTask = (id, newFields) => updateDoc(doc(db, "tasks", id), newFields);
