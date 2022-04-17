import styled from '@emotion/styled';
import Card from './Card';

const GridWrap = styled.div<{
  col: number,
}>`
  display: grid;
  grid-template-columns: repeat(${({ col }) => col}, 1fr);
  gap: 8px;
`;

type GridProps = {
  bools: boolean[][],
}

const Grid = ({
  bools,
}: GridProps) => {
  return (
    <GridWrap col={bools[0].length}>
      {
        bools.flat().map((bool, index) =>
          <Card key={index} isFlipped={bool} />)
      }
    </GridWrap>
  );
};

export default Grid;
