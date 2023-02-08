import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundary from '../error-boundary/error-boundary';
import Routes from '../route/route';
import Header from '../header/header';
import Dashboard from '../../pages/Dashboard/Dashboard';
import { useSelector } from 'react-redux';
import { AppState, useAppThunkDispatch } from '../../redux/store';
import 'react-toastify/dist/ReactToastify.css';
import { sampleApi, updateCount } from '../../redux/actions/common';
import Login from '../../pages/Login/LoginAdmin';

const App = () => {
    const count = useSelector((state: AppState) => state.common.count);
    const dispatch = useAppThunkDispatch();

    return (
        <>
            <Router>
            <ErrorBoundary>
                {/* <Header /> */}
            </ErrorBoundary>
                <div>
                    <div>
                        <div>
                            <ErrorBoundary>
                                {/* <Dashboard /> */}
                                <div>
                                <Routes />
                                </div>
                            </ErrorBoundary>
                        </div>

                    </div>
                </div>
            </Router>
        </>
    );
};
export default App as any;
