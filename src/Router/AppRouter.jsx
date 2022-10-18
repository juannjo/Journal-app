import { Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../Auth/routes/AuthRoutes"
import { JournalRoutes } from "../Journal"

export const AppRouter = () => {
  return (
    <Routes>  
        <Route path="/auth/*" element={ <AuthRoutes />}/>

        <Route path="/*" element={ <JournalRoutes />}/>
    </Routes>
  )
}
