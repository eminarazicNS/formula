import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router';

export default function BasicBreadcrumbs(props) {
    return (
        <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
                <Link to="/">Home</Link>
                {props.crumbs.map((item, i) => {
                    const isLast = i === props.crumbs.length - 1;
                    return (
                        <>
                        {isLast ? 
                            <span>{item.label}</span>
                            :
                            <Link key={i} to={item.path}>{item.label}</Link>
                        }
                        </>
                    );
                })}
            </Breadcrumbs>
        </div>
    );
}