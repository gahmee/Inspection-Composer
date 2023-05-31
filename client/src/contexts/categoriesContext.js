import { createContext, useReducer } from "react";

export const CategoriesContext = createContext()

export const categoriesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CATEGORIES':
            return {
                categories: action.payload
            }
        case 'EDIT_CATEGORY':
            const removedPrevious = state.categories.filter((category) => category._id !== action.payload._id)
            return {
                categories: [action.payload, ...removedPrevious]
            }
    }
}


export const CategoriesContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(categoriesReducer, {
        categories: null
    })

    return (
        <CategoriesContext.Provider value={{...state, dispatch}}>
            {children}
        </CategoriesContext.Provider>
    )
}