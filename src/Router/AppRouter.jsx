import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../Auth/routes/AuthRoutes"
import { useCheckAuth } from "../hooks"
import { JournalRoutes } from "../Journal"
import { CheckingAuth } from "../ui/components/CheckingAuth"

export const AppRouter = () => {

  const { status } = useCheckAuth()  
  
  if(status === 'Checking') return (
    <CheckingAuth />
  )

  return (
    <Routes>  

      {status === 'Authenticated' 
        ? <Route path="/*" element={ <JournalRoutes />}/>  
        : <Route path="/auth/*" element={ <AuthRoutes />}/>
      }  

      <Route path="/*" element={ <Navigate to='auth/login' /> }/>
    </Routes>
  )
}
