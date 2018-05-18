import {BotContext} from "./BotContext";

export function contains(contexts:BotContext[], s:string):boolean{

  for (let co of contexts){

    if(co.name == s){

      return true;

    }


  }
  return false;


}

export function only_contains(contexts:BotContext[], s:string):boolean{

  if(contexts.length > 1){

    return false;

  }else{

    return contexts[0].name == s;


  }

}

/**
 * Tests whether the contexts array first item name is equal to the given string or not
 * @param {BotContext[]} contexts
 * @param {string} s
 * @returns {boolean}
 */
export function contains_isFirst(contexts:BotContext[], s:string):boolean{

  return contexts[0].name == s;

}

export function contains_startsWith(contexts:BotContext[], s:string):boolean{

  for (let co of contexts){

    if(co.name.startsWith(s)){

      return true;

    }


  }
  return false;

}

/**
 * This will only return true if the given BotContext array contains a context which name is equal to
 * the first given string AND if the array does not contain a context which name starts with the second given string
 * @param {BotContext[]} contexts
 * @param {string} s
 * @returns {boolean}
 */
export function contains_noContainsStartWith(contexts:BotContext[], s:string, noContainsStartingWith:string):boolean{

  let result:boolean = false;

  for (let co of contexts){

    if(co.name == s){

      result = true;

    }

  }

  for (let co of contexts){

    if(co.name.startsWith(noContainsStartingWith)){

      result = false;

    }

  }

  return result;


}
