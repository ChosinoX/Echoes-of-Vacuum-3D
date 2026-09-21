# Echoes of Vacuum 3D

Samostatný vertical slice strategické 3D kolonie **Erebus Basin**, postavený v TypeScriptu, Vite a Three.js. Neobsahuje žádné napojení na backend, databázi ani deployment původní hry.

## Spuštění

```bash
npm install
npm run dev
```

## Asset pipeline

`src/core/assets.ts` poskytuje GLB/GLTF pipeline přes `GLTFLoader`. V tomto prvním slice nejsou dodány falešné GLB exporty primitiv: současné originální procedurální preview meshe budov a postav jsou explicitně vývojová vizualizace a budou nahrazeny autorsky vytvořenými GLB modely. Gameplay, kolize a ukládání jsou oddělené od renderovaných modelů.

## Ovládání

- prostřední tlačítko: posun kamery
- pravé tlačítko: rotace kamery
- kolečko: zoom
- levé tlačítko: cíl roveru / umístění vybrané budovy
