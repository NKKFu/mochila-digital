import React from 'react';
import styled from 'styled-components'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

const Footer = styled.div`
    margin: 0;
    background-color: #ebebeb;
    text-align: center;
    padding: 30px 0;
    width: 100vw;
    color: #fff;
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row;
    align-content: space-around;
`;

const RouterLink = styled(Link)`
    margin: 0 auto;
    color: gray;
    text-decoration: none;
    font-weight: bold;
`;

export default () => {
    return (
        <Footer>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/Admin">Admin Page</RouterLink>
        </Footer>
    );
}