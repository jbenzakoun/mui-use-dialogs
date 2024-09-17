import typescript from '@rollup/plugin-typescript';

export default {
  input: "src/index.ts",
  output: [
    { file: "dist/mui-use-dialogs.cjs.js", format: "cjs", sourcemap: "inline" },
    { file: "dist/mui-use-dialogs.esm.js", format: "esm", sourcemap: "inline" },
  ],
  external: [
    "react", 
    "react-dom", 
    "@mui/material", 
    "@mui/icons-material", 
    "@mui/icons-material/Close", 
    "@mui/icons-material/Save", 
    "react/jsx-runtime"
  ],
  plugins: [
    typescript({ sourceMap: false, inlineSources: true, inlineSourceMap: true }),
  ],
};