import MainLayout from './components/layout/MainLayout';
import { ConfigProvider } from 'antd';
import ReduxProvider from './redux/lib/ReduxProvider';
function App() {
    return (
        <>
            <ReduxProvider>
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
                    <MainLayout />
                </ConfigProvider>
            </ReduxProvider>
        </>
    );
}

export default App;
