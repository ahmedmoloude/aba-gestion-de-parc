import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from 'app/config';
import { AccountAddForm, AccountUpdateForm } from 'app/core/models';

@Injectable()
export class BoAccountService {
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  fetchListAccounts() {
    return this.http.get(Config.api.accounts.list);
  }
  addAccount(data: AccountAddForm) {
    return this.http.post(Config.api.accounts.create, data);
  }
  updateAccount(uuid: string, data: AccountUpdateForm) {
    return this.http.put(Config.api.accounts.update + '/' + uuid, data);
  }
  deleteAccount(uuid: string) {
    return this.http.delete(Config.api.accounts.delete + '/' + uuid);
  }
}
