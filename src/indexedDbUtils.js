export function openDB() {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open("NotesDatabase", 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("NotesStore")) {
                db.createObjectStore("NotesStore", {keyPath: "id"})
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

export async function saveNotes(notes) {
    const db = await openDB();
    const transaction = db.transaction("NotesStore", "readwrite");
    const store = transaction.objectStore("NotesStore");

    notes.forEach(note => {
        store.put(note);
    });

    return transaction.complete;
};

export async function getNotes() {
    const db = await openDB();
    const transaction = db.transaction("NotesStore", "readonly");
    const store = transaction.objectStore("NotesStore");

    return new Promise((resolve) => {
        const request = store.getAll();
        request.onsuccess = (e) => resolve(e.target.result);
    });
};

export async function deleteNoteFromDatabase(id) {
    const db = await openDB();
    const transaction = db.transaction("NotesStore", "readwrite");
    const store = transaction.objectStore("NotesStore");
    store.delete(id);
    
    return transaction.complete;
}