
export function incrementAjaxRequestsCnt (state  , val) {
  state.ajaxRequestsCnt++;
}
export function decrementAjaxRequestsCnt(state , val){
  state.ajaxRequestsCnt--;
}
export function resetAjaxRequestsCnt(state){
  state.ajaxRequestsCnt=0
}

export function setUser(state , val){
  state.user=val
}
export function clearUserSession(state){
  state.user=''
}
