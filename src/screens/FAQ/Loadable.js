/**
 * Asynchronously loads the component
 */
import CircularProgressLoadable from '../../components/CircularProgressLoadable';

export default CircularProgressLoadable({
  loader: () => import('./index'),
});
