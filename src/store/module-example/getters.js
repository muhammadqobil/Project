export function getUser (state) {
  alert(state.user)
  return state.user
}
export function isHaveError(state){
  return !!state.globalError && state.globalError.type != 'warning';
}

export function getGlobalError(state) {
  return state.globalError;
}
export function getPath(state){
  return state.path
}
