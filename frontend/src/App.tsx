import {ReactNode} from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route,
  RouterProvider,
  useRouteLoaderData,
} from 'react-router-dom'

import {InstructorDashboard, StudentDashboard} from './pages/dashboard/page'
import {InstructorHistory, StudentHistory} from './pages/history/page'
import {Layout} from './pages/layout'
import {loginAction, LoginPage} from './pages/login/page'
import {LandingPage} from './pages/page'
import {purchaseLoader} from './pages/purchase/loader'
import {StudentPurchase} from './pages/purchase/page'
import {PurchaseSuccessPage} from './pages/purchase/success/page'
import {StudentSchedule} from './pages/schedule/page'
import {searchPageLoader} from './pages/search/loader'
import {SearchPage} from './pages/search/page'
import {sessionProvider, UserRole} from './utils/session'

export function App() {
  return <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index path="/" element={<LandingPage />} />
      <Route
        path="/login"
        action={loginAction}
        element={<LoginPage />}
        errorElement={<LoginPage />}
      />
      <Route id="root" loader={checkAuthLoader} element={<Layout />}>
        <Route
          path="/dashboard"
          element={
            <RequireRole>
              {(isStudent) => (isStudent ? <StudentDashboard /> : <InstructorDashboard />)}
            </RequireRole>
          }
        />
        <Route
          path="/history"
          element={
            <RequireRole>
              {(isStudent) => (isStudent ? <StudentHistory /> : <InstructorHistory />)}
            </RequireRole>
          }
        />
        <Route
          path="/schedule"
          element={<RequireRole>{(isStudent) => isStudent && <StudentSchedule />}</RequireRole>}
        />
        <Route
          path="/search"
          loader={searchPageLoader}
          element={<RequireRole>{(isStudent) => isStudent && <SearchPage />}</RequireRole>}
        />
        <Route
          path="/purchase"
          loader={purchaseLoader}
          element={<RequireRole>{(isStudent) => isStudent && <StudentPurchase />}</RequireRole>}
        />
        <Route
          path="/purchase/success"
          element={<RequireRole>{(isStudent) => isStudent && <PurchaseSuccessPage />}</RequireRole>}
        />
      </Route>
    </>,
  ),
)

async function checkAuthLoader() {
  if (!sessionProvider.session) {
    return redirect('/login')
  }
  return sessionProvider.session.role
}

interface RequireRoleProps {
  children: ReactNode | ((arg: any) => ReactNode)
}

function RequireRole({children}: RequireRoleProps) {
  const role = useRouteLoaderData('root') as UserRole
  return <>{typeof children === 'function' ? children(role === 'STUDENT') : children}</>
}
