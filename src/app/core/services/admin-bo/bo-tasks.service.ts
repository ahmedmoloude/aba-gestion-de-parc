import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from 'app/config';
import {
  TaskAddForm,
  TaskUpdateForm,
} from 'app/core/models/task.model';

@Injectable()
export class BoTaskService {
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  fetchListTasks() {
    return this.http.get(Config.api.tasks.list);
  }
  addTask(data: TaskAddForm) {
    return this.http.post(Config.api.tasks.create, data);
  }
  updateTask(uuid: string, data: TaskUpdateForm) {
    return this.http.put(Config.api.tasks.update + '/' + uuid, data);
  }
  deleteTask(uuid: string) {
    return this.http.delete(Config.api.tasks.delete + '/' + uuid);
  }
  getTask(uuid: string) {
    return this.http.get(Config.api.tasks.get + '/' + uuid);
  }
}
