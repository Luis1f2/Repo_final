import React from 'react';
import '../Container/Container.scss';

const Container = ({children}) => {
    return (
        <div className={"Container"}>
            {children}
        </div>
    );
}

export default Container;