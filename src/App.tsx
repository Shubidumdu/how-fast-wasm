import { Button } from '@mui/material';
import { useEffect, useMemo, useReducer, useState } from 'react';
import Grid from './components/Grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { jsDfs } from './utils/jsDfs';

const makeNewMatrix = (row: number, col: number) =>
  [...new Array(row)].map(() => new Array(col).fill(false));

const App = () => {
  const [matrixSize, setMatrixSize] = useState({
    row: 10,
    col: 10,
  });
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [matrixForm, setMatrixForm] = useState(matrixSize);
  const [bools, setBools] =
    useState<boolean[][]>(makeNewMatrix(matrixSize.row, matrixSize.col));

  const handleClickResize = () => {
    setDialogOpen(true);
  };

  const handleCloseResize = () => {
    setDialogOpen(false);
  };

  const handleOkResize = () => {
    setMatrixSize(matrixForm);
    handleCloseResize();
  };

  const onSearch = (row: number, col: number) => {
    // setBools((bools) => bools.map(
    //     (_row, rowIndex) => _row.map((val, colIndex) =>
    // row === rowIndex &&
    // col === colIndex ?
    //   true : val,
    //     ),
    // ));
    setTimeout(() => {
      setBools((bools) => bools.map(
          (_row, rowIndex) => _row.map((val, colIndex) =>
    row === rowIndex &&
    col === colIndex ?
      true : val,
          ),
      ));
    }, 0);
  };

  const onFinish = (row: number, col: number) => {
  };

  const handleDfsByJs = () => jsDfs({
    start: [0, 0],
    size: [matrixSize.row, matrixSize.col],
    target: [matrixSize.row - 1, matrixSize.col - 1],
    onSearch,
    onFinish,
  });

  console.log('rerendering...');

  useEffect(() => {
    setBools(makeNewMatrix(matrixSize.row, matrixSize.col));
  }, [matrixSize]);

  useEffect(() => {
    console.log('effect by useEffect!');
  }, [bools]);

  return (
    <div>
      <Grid bools={bools} />
      <Button variant="outlined" onClick={handleClickResize}>
        Resize
      </Button>
      <Button variant="contained" onClick={handleDfsByJs}>
        DFS by JS
      </Button>
      <Dialog open={isDialogOpen} onClose={handleCloseResize}>
        <DialogTitle>Resize matrix size</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              id="row"
              defaultValue={matrixSize.row}
              onChange={(e) => setMatrixForm((form) => {
                return ({ ...form, row: parseInt(e.target.value) });
              })}
              label="Row"
              type="number"
              margin="normal"
              autoFocus
            />
          </div>
          <div>
            <TextField
              id="col"
              defaultValue={matrixSize.col}
              onChange={(e) => setMatrixForm((form) => {
                return ({ ...form, col: parseInt(e.target.value) });
              })}
              label="Column"
              type="number"
              margin="normal"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResize}>Cancel</Button>
          <Button
            onClick={handleOkResize}
            disabled={!matrixForm.col || !matrixForm.row}
          >
          Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App;
