import { useLayoutEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from 'react-router-dom'

import Layout from './Layout.js'
import AccountPage from './pages/AccountPage.jsx'
import CoinPage from './pages/CoinPage.jsx'
import CoinsPage from './pages/CoinsPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ErrorFallback from './pages/ErrorFallback.jsx'
import NewsPage from './pages/NewsPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import SignInPage from './pages/SignInPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import PrivateRoute from './routes/PrivateRoute.js'

// Retrieve appearance preference (if any)
if (localStorage) {
    const html = document.querySelector('html')

    if (localStorage.getItem('Theme') === 'Light') {
        html.classList.remove('dark')
    } else if (localStorage.getItem('Theme') === 'Dark') {
        html.classList.add('dark')
    }
}

const App = () => {
    const ScrollToTop = ({ children }) => {
        const location = useLocation()

        useLayoutEffect(() => {
            document.documentElement.scrollTo(0, 0)
        }, [location.pathname])
        return children
    }

    return (
        <Router basename={process.env.PUBLIC_URL}>
            <ScrollToTop>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <Routes>
                        <Route path="/" exact element={<SignInPage />} />
                        <Route path="/signup" element={<SignUpPage />} />

                        <Route element={<PrivateRoute />}>
                            <Route element={<Layout />}>
                                <Route
                                    path="/dashboard"
                                    element={<Dashboard />}
                                />
                                <Route path="/coins" element={<CoinsPage />} />
                                <Route
                                    path="/coin/:uuid"
                                    element={<CoinPage />}
                                />
                                <Route path="/news" element={<NewsPage />} />
                                <Route
                                    path="/setting"
                                    element={<AccountPage />}
                                />
                            </Route>
                        </Route>

                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </ErrorBoundary>
            </ScrollToTop>
        </Router>
    )
}

export default App
