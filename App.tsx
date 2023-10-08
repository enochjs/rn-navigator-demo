import Home from '@/index';

const ctx = (require as any).context(
  // If this require.context is not inside the root directory (next to the package.json) then adjust this file path
  // to resolve correctly.
  './node_modules/.cache/expo/tailwind'
);
if (ctx.keys().length) ctx(ctx.keys()[0]);

export default function App() {
  return <Home />;
}
