// import { ClassNames } from "@emotion/react"
import React from "react"
import { BrowserRouter , Route , Routes } from "react-router-dom"
import Sign_Up from "./components/Sign_Up"
import Login_page from "./components/Login_page"

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/"
          element={<Sign_Up />}
        />

        <Route path="/login"
          element = {<Login_page/>}
        />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
