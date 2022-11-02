export const isLoggedIn = (state) => state.root.auth.isLoggedIn;
export const isLoadingLogin = (state) => state.root.auth.isLoadingLogin;
export const isLoadingRegister = (state) => state.root.auth.isLoadingRegister;
export const isLoadingRefresh = (state) => state.root.auth.isLoadingRefresh;
export const isLoadingLogout = (state) => state.root.auth.isLoadingLogout;
export const user = (state) => state.root.auth.user;
export const showArchive = (state) => state.root.notes.showArchive;
export const currentNotesCategory = (state) => state.root.notes.currentCategory;
