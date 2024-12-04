export class ComplaintReason {
  uuid: string;
  id: string;
  type: string;
  reason: string;
  created_at: string;
  updated_at: string;

  constructor(reason: any = null) {
    if (reason) {
      this.uuid = reason.uuid;
      this.id = reason.id;
      this.type = reason.type;
      this.reason = reason.reason;
      this.created_at = reason.created_at;
      this.updated_at = reason.updated_at;
    }
  }
}
