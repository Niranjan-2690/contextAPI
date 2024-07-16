import {createContext} from 'react';

export const appContext = createContext({
    heading: ""
})

function AppContextProvider({children}){

    const heading = "This is context API"

    return  <appContext.Provider value={{heading}}>
                {children}
            </appContext.Provider>           
}

export default AppContextProvider;