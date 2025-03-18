import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { doc, updateDoc } from '@angular/fire/firestore';

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

  async create(task: TaskCreate): Promise<Task> {
    const doc = await addDoc(this._collection, task);
    return { id: doc.id, ...task };
  }

  async update(task: Task): Promise<void> {
    // TODO
    const taskDoc = doc(this._firestore, `${PATH}/${task.id}`);
    await updateDoc(taskDoc, {
      name: task.name,
      description: task.description,
      status: task.status,
    });
  }
}
