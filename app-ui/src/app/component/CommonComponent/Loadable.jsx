import { Suspense } from 'react';
import Loading from './AppLoading';

const Loadable = (Component) => (props) => {
    return (
        <Suspense fallback={<Loading />}>
            <Component {...props} />
        </Suspense>
    );
};

export default Loadable;