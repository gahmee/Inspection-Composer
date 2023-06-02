import { createContext, useReducer } from "react";

export const CategoriesContext = createContext()

export const categoriesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CATEGORIES':
            return {
                categories: action.payload
            }
        case 'CREATE_CATEGORY':
            return {
                categories: [...state.categories, action.payload]
            }
        case 'EDIT_CATEGORY':
            const indexToEdit = state.categories.findIndex((category) => category._id === action.payload._id)
            state.categories[indexToEdit] = action.payload
            return {
                categories: [...state.categories]
            }
        case 'DELETE_CATEGORY':
            const removedCategory = state.categories.filter((category) => category._id !== action.payload._id)
            return {
                categories: [...removedCategory]
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