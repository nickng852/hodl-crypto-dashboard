import React from "react";
import styled from "styled-components";

export const Coin = ({ id, name, symbol }) => {
  const url = `https://s2.coinmarketcap.com/static/img/coins/128x128/${id}.png`;

  return (
    <>
      <CoinWrapper>
        <CoinLogo src={url} />
        <CoinName>{name}</CoinName>
        <CoinSymbol>{symbol}</CoinSymbol>
      </CoinWrapper>
    </>
  );
};

const CoinWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 1rem;
`;

const CoinName = styled.div`
  margin-left: 1rem;
`;

const CoinSymbol = styled.div`
  margin-left: 1rem;
`;

const CoinLogo = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;
