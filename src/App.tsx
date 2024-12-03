import MainLayout from './components/layout/MainLayout';
import { ConfigProvider } from 'antd';
import ProtectedRoute from './components/layout/ProtectedRoute';

function App() {
    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#0A8FDC',
                    },
                    components: {
                        Input: {
                            borderRadius: 40,
                        },
                        Select: {
                            borderRadius: 40,
                        },
                    },
                }}
            >
                <ProtectedRoute>
                    <MainLayout />
                </ProtectedRoute>
            </ConfigProvider>
        </>
    );
}

export default App;
