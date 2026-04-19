// QuestionService.ts - Manages manually entered questions in IndexedDB
import { mockQuestions, Question } from '../data/mockQuestions';

const DB_NAME = 'EduArenaQuestions';
const STORE_NAME = 'questions';
const DB_VERSION = 1;

export class QuestionService {
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

  static async addQuestion(question: Omit<Question, 'id'>): Promise<string> {
    const db = await this.getDB();
    const id = Date.now().toString(); // Use timestamp as simple ID
    const newQuestion: Question = { ...question, id };

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.add(newQuestion);

      request.onsuccess = () => resolve(id);
      request.onerror = () => reject(request.error);
    });
  }

  static async getAllQuestions(): Promise<Question[]> {
    const db = await this.getDB();
    const userQuestions: Question[] = await new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    // Combine with mock questions for the full state (if desired)
    return [...mockQuestions, ...userQuestions];
  }

  static async deleteQuestion(id: string): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}
