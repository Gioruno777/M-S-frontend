import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import HomePage from "./pages/HomePage"
import BurgerPage from "./pages/foodpages/BurgerPage"
import FoodDetailPage from "./pages/foodpages/FoodDetailPage"
import SideDishPage from "./pages/foodpages/SideDishPage"
import BeveragePage from "./pages/foodpages/BeveragePage"
import NutritionFactsPage from "./pages/foodpages/NutritionFactsPage"
import SearchBurgerPage from "./pages/foodpages/SearchBurgerPage"
import SearchSidePage from "./pages/foodpages/SearchSidePage"
import SearchBeveragePage from "./pages/foodpages/SearchBeveragePage"



const App = () => {
  // const { isLoggedIn } = useAuthContext()
  // console.log(isLoggedIn)

  return (
    <Routes>
      <Route path="/" element={<Layout ><HomePage /></Layout>} />

      <Route path="/menu">

        <Route path="main" element={<Layout ><BurgerPage /></Layout>} />
        <Route path="main/:foodId" element={<Layout ><FoodDetailPage /></Layout>} />
        <Route path="main/search" element={<Layout ><SearchBurgerPage /></Layout>} />

        <Route path="side" element={<Layout ><SideDishPage /></Layout>} />
        <Route path="side/:foodId" element={<Layout ><FoodDetailPage /></Layout>} />
        <Route path="side/search" element={<Layout ><SearchSidePage /></Layout>} />

        <Route path="beverage" element={<Layout ><BeveragePage /></Layout>} />
        <Route path="beverage/:foodId" element={<Layout ><FoodDetailPage /></Layout>} />
        <Route path="beverage/search" element={<Layout ><SearchBeveragePage /></Layout>} />

        <Route path="nutritionfacts" element={<Layout ><NutritionFactsPage /></Layout>} />

      </Route>

      {/* <Route path="/auth">
        {!isLoggedIn &&
          <>
            <Route path="login" element={<Layout ><LoginPage /></Layout>} />
            <Route path="signup" element={<Layout ><SignUpPage /></Layout>} />
            <Route path="forgotpassword" element={<Layout ><ForgotPasswordPage /></Layout>} />
            <Route path="resetpassword/:resetToken" element={<Layout ><ResetPasswordPage /></Layout>} />
          </>
        }
        <Route path="term" element={<Layout ><TermPage /></Layout>} />
      </Route> */}

      {/* <Route path="/member" element={<ProtectedRoute />}>
        <Route path="main" element={<Layout><MemberMainPage /></Layout>} />
        <Route path="updatepassword" element={<Layout><MemberUpdatePasswordPage /></Layout>} />
        <Route path="updatepersonalinfo" element={<Layout><UpdatePersonalInfoPage /></Layout>} />
        <Route path="purchasedetail" element={<Layout><PurchaseDetailPage /></Layout>} />
      </Route> */}

      {/* <Route path="/order" element={<ProtectedRoute />}>
        <Route path="cart" element={<Layout><CartPage /></Layout>} />
        <Route path="checkout" element={<Layout><CheckoutPage /></Layout>} />
      </Route> */}


      <Route path="*" element={<Navigate to="/" />} />
    </Routes >
  )
}

export default App