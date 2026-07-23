import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import { ShareTechMono_400Regular } from '@expo-google-fonts/share-tech-mono';

export const typography = {
  bebas: 'BebasNeue_400Regular',
  mono: 'ShareTechMono_400Regular',
  system: undefined,
};

let _fontsLoaded = false;

export function loadFonts() {
  const [loaded] = useFonts({
    BebasNeue_400Regular,
    ShareTechMono_400Regular,
  });
  _fontsLoaded = loaded;
  return loaded;
}

export function useLoadedFonts() {
  const [loaded] = useFonts({
    BebasNeue_400Regular,
    ShareTechMono_400Regular,
  });
  _fontsLoaded = loaded;
  return loaded;
}

export function isFontsLoaded() {
  return _fontsLoaded;
}
