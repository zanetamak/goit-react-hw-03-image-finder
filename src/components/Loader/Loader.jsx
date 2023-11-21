import { FallingLines } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => {
  return (
      <div className={css.overlay}>
<FallingLines
className={css.loader}
  color="#4fa94d"
  width="100"
  visible={true}
  ariaLabel='falling-lines-loading'
/></div>
  );
};

