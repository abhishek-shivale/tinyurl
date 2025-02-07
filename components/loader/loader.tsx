import { Loader2 } from 'lucide-react';
import './loader.css';

function Loader({ color }: { color?: string }) {
  return <Loader2 color={color} className='spinner inline-block text-white' />;
}

export default Loader;