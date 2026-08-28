# Hero Explore Spacing Validation Notes

Desktop and mobile screenshots were reviewed after the first spacing implementation. The Explore cue remains centered with the requested 35px lower-edge clearance. Because the cue remains absolutely positioned, changing its `margin-top` does not create a measured 120px gap beneath `p.gws-glowy-flow`. The next implementation must establish the requested visual gap in normal flow while retaining the approved lower-edge clearance and mobile composition.

Final verification confirmed the cue now follows `p.gws-glowy-flow` in normal layout flow with a 120px tokenized margin. Desktop and mobile screenshots show centered placement, the intended clear interval beneath the flow, and retained lower-edge clearance. The change passed the full Vitest suite, TypeScript check, and production build.
