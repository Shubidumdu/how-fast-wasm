import { useState } from 'react';
import Grid from './components/Grid';

const App = () => {
  const [bools] = useState<boolean[][]>(
      [...new Array(10)].map(() => new Array(10).fill(false)),
  );

  return (
    <div>
      <Grid bools={bools} />
    </div>
  );
};

export default App;
