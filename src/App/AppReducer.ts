import { createContext, Dispatch } from 'react'
import Forum from '../Components/Forum'
import Login from '../Components/Login'

export enum AppActionType {
  SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
  SET_USERNAME = 'SET_USERNAME',
  SET_LOGIN = 'SET_LOGIN'
}

export interface IAppAction {
  currentPage?: string
  username?: string
  type: AppActionType
}

export const initialState = {
  currentPage: 'Login',
  username: 'user3'
}

interface IContextProps {
  state: typeof initialState
  dispatch: Dispatch<IAppAction>
}

export const AppContext = createContext({} as IContextProps)

export function AppReducer(state: any, action: IAppAction) {
  switch (action.type) {
    case AppActionType.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage
      }
    case AppActionType.SET_USERNAME:
      return {
        ...state,
        username: action.username
      }
    case AppActionType.SET_LOGIN:
      return {
        ...state,
        username: action.username,
        currentPage: action.currentPage
      }
    default:
      return state
  }
}

interface IPageLogic {
  [pageName: string]: any
}

export const PAGE_LOGIC: IPageLogic = {
  Login,
  Forum
}
