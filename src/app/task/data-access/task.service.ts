import { inject, Injectable, signal } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  getDoc,
} from '@angular/fire/firestore';
import { doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

export interface Task {
  id: string;
  name: string;
  description: string;
  status: boolean;
}

export type TaskCreate = Omit<Task, 'id'>;

const PATH = 'task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _firestore = inject(Firestore);

  private _collection = collection(this._firestore, PATH);

  loading = signal<boolean>(true);

  async create(task: TaskCreate): Promise<Task> {
    const doc = await addDoc(this._collection, task);
    return { id: doc.id, ...task };
  }

  async update(task: Task): Promise<void> {
    const taskDoc = doc(this._firestore, `${PATH}/${task.id}`);
    await updateDoc(taskDoc, {
      name: task.name,
      description: task.description,
      status: task.status,
    });
  }

  async delete(id: string): Promise<void> {
    const taskDoc = doc(this._firestore, `${PATH}/${id}`);
    await deleteDoc(taskDoc);
  }

  // Get all tasks
  getTasks = toSignal(
    (
      collectionData(this._collection, { idField: 'id' }) as Observable<Task[]>
    ).pipe(
      tap(() => {
        this.loading.set(false);
      }),
      catchError((error) => {
        console.error('Error getting documents: ', error);
        this.loading.set(false);
        return throwError(error);
      })
    ),
    { initialValue: [] }
  );

  // Get task by id
  getById(id: string) {
    const taskRef = doc(this._collection, id);
    return getDoc(taskRef);
  }

  updateStatus(id: number, status: boolean) {
    const taskRef = doc(this._collection, id.toString());
    updateDoc(taskRef, { status });
  }
}
