import { createContext, useReducer } from "react";

export const CategoriesContext = createContext()

export const categoriesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CATEGORIES':
            return {
                categories: action.payload
            }
        case 'EDIT_CATEGORY':
            const index = state.categories.findIndex((category) => category._id === action.payload._id)
            state.categories[index] = action.payload
            return {
                categories: [...state.categories]
            }
        default:
            return {
                state
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