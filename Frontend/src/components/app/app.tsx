import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundary from '../error-boundary/error-boundary';
import Routes from '../route/route';
import { useSelector } from 'react-redux';
import { AppState, useAppThunkDispatch } from '../../redux/store';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const count = useSelector((state: AppState) => state.common.count);
    const dispatch = useAppThunkDispatch();

    return (
        <>
            <Router>
            <ErrorBoundary>
            </ErrorBoundary>
                <div>
                    <div>
                        <div>
                            <ErrorBoundary>
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
