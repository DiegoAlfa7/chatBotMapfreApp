export class Message{

   private _from:string;

   private _to:string;

   private _msgBody:string;

   private _type:string;

   private _context: string;

  /**
   *
   * @param {string} body message string
   * @param {string} from
   * @param {string} to
   * @param context should store the context for further usages
   */
   constructor(body:string, type:string, from?:string, to?:string, context?:any){

    this._msgBody = body;
    this._type = type;

    if(from){

      this._from = from;

    }

    if(to){

      this._to = to;

    }

    if(context){

      this._context = context;
    }

   }


  get from(): string {
    return this._from;
  }

  set from(value: string) {
    this._from = value;
  }

  get to(): string {
    return this._to;
  }

  set to(value: string) {
    this._to = value;
  }

  get msgBody(): string {
    return this._msgBody;
  }

  set msgBody(value: string) {
    this._msgBody = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get context(): string {
    return this._context;
  }

  set context(value: string) {
    this._context = value;
  }
}
