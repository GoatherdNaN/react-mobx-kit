import { inject, observer } from 'mobx-react'

const AuthComponent = inject("loginStore")(
  observer(
    ({loginStore, code, children}) => code && loginStore.authArr.includes(code) ? children : null
  )
)

export default AuthComponent;