import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { useAppContext } from "./contexts/AppContext";
import AdminLayout from "./layouts/AdminLayout";
import AddProduct from "./pages/admin/AddProduct";
import Products from "./pages/admin/Products";

function App() {
  const { isAdmin } = useAppContext();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>home page</p>
            </Layout>
          }
        ></Route>

        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        ></Route>

        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        ></Route>

        {isAdmin && (
          <>
            <Route
              path="/admin"
              element={<AdminLayout>admin dashboard</AdminLayout>}
            />

            <Route
              path="/admin/products"
              element={
                <AdminLayout>
                  <Products />
                </AdminLayout>
              }
            />

            <Route
              path="/admin/products/add"
              element={
                <AdminLayout>
                  <AddProduct />
                </AdminLayout>
              }
            />

            <Route
              path="/admin/orders"
              element={<AdminLayout>orders</AdminLayout>}
            />

            <Route
              path="/admin/customers"
              element={<AdminLayout>customers</AdminLayout>}
            />

            <Route
              path="/admin/reviews"
              element={<AdminLayout>reviews</AdminLayout>}
            />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
