export class Message{

   from:string;

   to:string;

   msgBody:string;

   context: any;

  /**
   *
   * @param {string} body message string
   * @param {string} from
   * @param {string} to
   * @param context should store the context for further usages
   */
   constructor(body:string, from?:string, to?:string, context?:any){

    this.msgBody = body;

    if(from){

      this.from = from;

    }

    if(to){

      this.to = to;

    }

    if(context){

      this.context = context;
    }

   }

}
