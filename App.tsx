import Route from '@/routers/index';
import { NavigationContainer } from '@react-navigation/native';

const ctx = (require as any).context(
  // If this require.context is not inside the root directory (next to the package.json) then adjust this file path
  // to resolve correctly.
  './node_modules/.cache/expo/tailwind'
);
if (ctx.keys().length) ctx(ctx.keys()[0]);

export default function App() {
  return (
    <NavigationContainer>
      <Route />
    </NavigationContainer>
  );
}
