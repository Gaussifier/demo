# Gaussifier: live browser demo

Supplementary material for an anonymous submission. This static page runs the Gaussifier model in
the browser with WebGPU: pick one of the Kodak images or drop in your own, and it predicts the 2D
Gaussians, applies the refinement steps, and renders the result, all on your GPU. Nothing is
uploaded.

- **Refine** sets the number of refinement steps after the initializer (the model is trained for 6).
- **Count** scales the Gaussian count relative to the model's own count, from ×¼ to ×4.
- **Export .splat2d** saves the Gaussians of the shown refinement.

## Requirements

A browser with WebGPU (recent Chrome or Edge on desktop; Safari and Firefox with WebGPU enabled). A
run takes well under a second on a discrete GPU, a few seconds on an integrated one.
This WebGPU version is slower than the C++ TensorRT pipeline behind the paper's timings.

## View locally

WebGPU needs a secure context, and `localhost` counts as one:

```
python3 -m http.server 8000
```

then open <http://localhost:8000/>.

## Hosting

Static files only, with relative paths, ready for GitHub Pages from the repository root.
`models/` holds the exported model (ONNX for the forward map, packed weights for the refinement
head); `ort/` is the ONNX Runtime Web runtime (MIT license).

## Images

The samples are the Kodak Lossless True Color Image Suite, released by Eastman Kodak for
unrestricted use.
