import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import ReactDOM from 'react-dom';

import api from '../../services/api'


export default function ContentViewer(props) {
    useEffect(() => {
        const fileName = props.match.params.path;
        // localStorage.getItem('myData');

        api.get(`/content/${fileName}`).then(response => {

            console.log(response.data);

            // localStorage.setItem(`content-${fileName}`, response.data);
            document.getElementById('contentReader').innerHTML = response.data;

            // setHTMLContent(response.data);
        }).catch(err => {
            const response = localStorage.getItem(`content-${fileName}`);
            document.getElementById('contentReader').innerHTML = response || '<h3>Não foi possível abrir este documento</h3>'
        });
    }, []);

    return (
        <div id="contentReader">

        </div>
    );
}