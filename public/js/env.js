

//stores the userId for the current session
const setUserId = (userId) => {
    sessionStorage.setItem('userId', userId);
}

export {setUserId}