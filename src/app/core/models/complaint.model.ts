import { User } from './user.model';
import { DETAILS_COMPLAINT } from '../../config/vars.config';
import { Message } from './message.model';
export class Complaint {
  uuid: string;
  id: string;
  description: string;
  status: string;
  created_by: User = null;
  created_at: string;
  updated_at: string;
  type: string;
  task: any;
  details = [];
  customer: any;
  childs: any;
  reason: string;
  object: string;
  messages: Message[] = [];
  tasks: any[];
  parent_id: Number;
  document:any;
  parent: any;
  parentStatus: any;
  reference: string;

  constructor(complaint: any = null, isChild = false) {
    if (complaint) {
      this.uuid = complaint.uuid;
      this.id = complaint.id;
      this.description = complaint.description;
      this.status = complaint.status;
      this.reason = complaint.reason;
      this.created_at = complaint.created_at;
      this.updated_at = complaint.updated_at;
      this.type = complaint.type;
      this.object = complaint.object;
      this.tasks = complaint.tasks;
      this.parent_id = complaint.parent_id;
      this.parent = complaint.parent
      this.document = complaint.document;
      this.reference = complaint.reference;
      if (complaint.created_by)
        this.created_by = new User(complaint.created_by);
      this.task = complaint.task;
      if (complaint.messages)
        this.messages = complaint.messages.map((item) => new Message(item));
      this.customer = complaint.customer;
      this.details = complaint.details
      if (!complaint.details && complaint.type in DETAILS_COMPLAINT) {
        let items = DETAILS_COMPLAINT[complaint.type]['name'];
        this.details = complaint.type ? complaint[items] : [];
      }
    }
  }

  setList = (list: Array<string>) => {
    let listItem = [];
    for (const lt of list) {
      listItem.push(new Complaint(lt, true));
    }

    return listItem;
  };

  setTasks = (complait: Complaint) => {
    let listItem = complait.tasks;
    for (const lt of complait.childs) {
      listItem = [...listItem, ...lt['tasks']]
    }
    return listItem;
  }
}
