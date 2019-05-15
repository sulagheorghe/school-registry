import { default as React, Dispatch, SetStateAction } from 'react'

type GlobalState = {
  profile?: any
  setProfile: Dispatch<SetStateAction<any>>
}

export const GlobalContext = React.createContext<GlobalState>({
  profile: undefined,
  setProfile: () => undefined
})

export const GlobalConsumer = GlobalContext.Consumer

const access_token = localStorage.getItem('access_token')

export function GlobalProvider(props: any) {
  const [profile, setProfile] = React.useState(access_token ? { access_token } : undefined)
  return (
    <GlobalContext.Provider value={{ profile, setProfile }}>
      {props.children}
    </GlobalContext.Provider>
  )
}