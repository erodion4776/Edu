// BrainService.ts - Manages the local "Knowledge Base" (The Brain) using IndexedDB
// This allows the site to store extracted PDF text without a backend.

const DB_NAME = 'EduArenaBrain';
const STORE_NAME = 'knowledge';
const DB_VERSION = 1;

interface Knowledge {
  id: string;
  fileName: string;
  text: string;
  timestamp: number;
}

export class BrainService {
  private static db: IDBDatabase | null = null;

  private static async getDB(): Promise<IDBDatabase> {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve(this.db!);
      };

      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  }

  static async addKnowledge(fileName: string, text: string): Promise<string> {
    const db = await this.getDB();
    const id = crypto.randomUUID();
    const knowledge: Knowledge = {
      id,
      fileName,
      text,
      timestamp: Date.now()
    };

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.add(knowledge);

      request.onsuccess = () => resolve(id);
      request.onerror = () => reject(request.error);
    });
  }

  static async getAllKnowledge(): Promise<Knowledge[]> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  static async deleteKnowledge(id: string): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  static async getContext(query: string): Promise<string> {
    const all = await this.getAllKnowledge();
    if (all.length === 0) return "";

    // Simple keyword extraction/matching for context
    // In a real RAG system, this would use embeddings.
    const combinedText = all.map(k => `--- Source: ${k.fileName} ---\n${k.text}`).join('\n\n');
    
    // For now, return the most relevant snippets or the whole thing if it's small
    // Gemini 1.5/2.5/3 Pro have 1M+ token windows, so we can send quite a lot.
    return combinedText;
  }
}
