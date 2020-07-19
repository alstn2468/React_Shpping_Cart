import * as React from 'react';
import RootRouter from 'components/Router';
import GlobalStyles from 'components/GlobalStyles';
import Mobile from 'components/Mobile';
import { useDeviceDetect } from 'utils/useDeviceDetect';

function App(): React.ReactElement {
    const { isMobile } = useDeviceDetect();

    return (
        <React.StrictMode>
            <GlobalStyles />
            {isMobile ? <Mobile /> : <RootRouter />}
        </React.StrictMode>
    );
}

export default App;
