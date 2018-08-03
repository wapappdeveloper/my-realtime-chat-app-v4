export interface DataModule {
    email:string,
    pass:string,
    userDetail:{
        profileName:string,
        birthday:string,
        gender:string,
        profilePictureUrl:string,
        phone:string
    },
    chatArray: Array<any>,
    loginSuccess: boolean,
    validUser: boolean,
    onlineUsers: Array<any>,
    chatSampleArray: Array<any>,
    previousPage:string,
    currentPage:string,
    navPages:Array<any>,
    userUID:string,
    localStorageID:string
}
