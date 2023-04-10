
export function incrementAjaxRequestsCnt (state  , val) {
  state.ajaxRequestsCnt++;
}
export function decrementAjaxRequestsCnt(state , val){
  state.ajaxRequestsCnt--;
}
export function resetAjaxRequestsCnt(state){
  state.ajaxRequestsCnt = 0
}

export function setUser(state , val){
  state.user = val
}
export function clearUserSession(state){
  state.user = '';
  state.path = '';
}
export function setUserAals (state , val){
  state.userActions.splice(0 , state.userActions.length , ...val)
}

export function setGlobalError(state, val) {
  state.globalError = val;
}
