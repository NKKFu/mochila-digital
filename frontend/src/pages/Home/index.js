import React, { useEffect, useState } from 'react';
import styled from 'styled-components'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import api from '../../services/api'
import { Link } from 'react-router-dom';

function ContentCard(props) {
  const { title, description, id } = props;

  return (
    <Container>
      <Link to={`/viewer/${id}`}>
        <h3>{title}</h3>
        <h6>{description}</h6>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  background-color: #ebebeb;
  color: #FFF;
  padding: 20px;
  margin-top: 20px;

  * {
    text-decoration: none;
    color: #707070;
    margin: 0;
  }
`;

function Home() {
  const [contentList, setContent] = useState([]);

  useEffect(() => {
    api.get('/content').then(response => {
      if (response.status !== 200)
        return;

      setContent(response.data);
    })
  }, []);

  return (
    <div>
      <Header />
      {contentList.map(content =>
        <ContentCard
          key={content.id}
          title={content.title}
          description={content.description}
          id={content.id}
        />
      )}
      <Footer />
    </div>
  );
}

export default Home;
