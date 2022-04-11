import { useState } from 'react';

let db: IDBDatabase;

export function useDBInit() {
  const [isDBInitted, setDBInitted] = useState(false);

  if (!isDBInitted) {
    const request = indexedDB.open('messenger');

    request.onsuccess = function () {
      db = request.result;
      setDBInitted(true);
    };

    request.onerror = function () {
      setDBInitted(true);
    };

    request.onupgradeneeded = function () {
      db = request.result;
      setDBInitted(true);

      if (!db.objectStoreNames.contains('chats')) {
        db.createObjectStore('chats');
      }
    };

    request.onerror = function () {
      console.error('Error', request.error);
    };
  }

  return isDBInitted;
}

export function DBAdd(store: string, _id: string, object: any) {
  if (db) {
    const transaction = db.transaction(store, 'readwrite');
    const chats = transaction.objectStore(store);

    chats.add(object, _id);
  }
}

export function DBSet(store: string, _id: string, object: any, onEnd: Function) {
  if (db) {
    const transaction = db.transaction(store, 'readwrite');
    const chats = transaction.objectStore(store);

    const request = chats.put(object, _id);

    request.onsuccess = onEnd;

    request.onerror = function () {
      console.log(request.error);
    };
  }
}

export function DBGet(store: string, _id: string, onGet: Function) {
  const transaction = db.transaction(store, 'readwrite');
  const chats = transaction.objectStore(store);

  const request = chats.get(_id);

  request.onerror = function () {
    console.log(request.error);
  };

  request.onsuccess = function () {
    onGet(request.result);
  };
}
