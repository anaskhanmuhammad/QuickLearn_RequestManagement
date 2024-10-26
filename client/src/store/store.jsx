import { act, createContext, useReducer } from "react"

export const context = createContext({userType: "", setUserType: () => {}});

function UserTypeReducer(currUserType, action) {
    let newUserType = currUserType;
    if (action.type === 'SET_USERTYPE') {
        newUserType = action.payload;
    }
    return newUserType;
}




const ContextProvider = ({children}) => {
    const [userType, DispatchUserType] = useReducer(UserTypeReducer, "")

    function setUserType(userType) {
        DispatchUserType({type: 'SET_USERTYPE', payload: userType})
    }


    return <context.Provider value={{userType, setUserType}}>{children}</context.Provider>;

}


export default ContextProvider;

