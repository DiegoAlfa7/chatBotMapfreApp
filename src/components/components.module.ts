import { NgModule } from '@angular/core';
import { UserMessageComponent} from "./user-message/user-message";
import {BotMessageComponent} from "./bot-message/bot-message";

@NgModule({
  declarations: [UserMessageComponent, BotMessageComponent],
  imports: [],
  exports: [],
  entryComponents: [UserMessageComponent, BotMessageComponent]
})
export class ComponentsModule {



}
