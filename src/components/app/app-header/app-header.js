import React from 'react';
import './app-header.css';
import styled from 'styled-components';

const AppHeaderBlock = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  h1 {font-size: 26px;}
  h2 {
    font-size: 1.2rem;
    color: grey;
  }
`

const AppHeader = ({liked, total}) => {
  return (
    <AppHeaderBlock>
      <h1>Anton Karkotski</h1>
      <h2>{total} записей, из них понравилось {liked}</h2>
    </AppHeaderBlock>
  );
}

export default AppHeader;