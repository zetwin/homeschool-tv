# Which design tools and references to use

Date: 2026-11-06. The owner asked why we hand-write designs instead of using what top teams use.

**How solid this is:** popularity numbers come mostly from vendor and comparison blogs, are dated differently, and should be treated as approximate. Sources marked "memory" weren't checked. I found no official teardown from Supercell, Sony, Bungie or Riot.

## Component frameworks
| Tool | What's known | Fit for us |
|---|---|---|
| **shadcn/ui** | Called the most popular current choice by one guide. Copy-in code built on Radix and Tailwind ([HeroUI](https://heroui.com/blog/best-react-ui-component-libraries), [UXPin](https://www.uxpin.com/studio/blog/top-react-component-libraries/)) | **Recommended.** A clean, neutral base we own and can restyle |
| **Radix UI** | Foundation under many libraries ([PkgPulse](https://www.pkgpulse.com/guides/best-react-ui-libraries-2026)) | Comes with shadcn. Handles keyboard and screen-reader behavior |
| **MUI** | Most downloaded, about 1.4 million a week in one guide, and 98,000+ GitHub stars ([DEV](https://dev.to/zny10289/best-react-component-libraries-2026-mui-chakra-ui-shadcnui-and-more-compared-2fhf)) | Solid, but tends to look like Google's Material |
| **Mantine** | About 1.35 million a week in one guide ([PkgPulse](https://www.pkgpulse.com/guides/top-react-component-libraries)) | A good second choice |

## Motion tools
| Tool | What's known | Use for |
|---|---|---|
| **Motion** (formerly Framer Motion) | A simple, powerful React motion library ([wmtips](https://www.wmtips.com/technologies/javascript-libraries/filter/animation/)) | **Interface:** presses, page changes, lists |
| **GSAP** | Widely used, high-performance ([wmtips](https://www.wmtips.com/technologies/compare/gsap-vs-rive/)) | **Lessons:** we already use it |
| **Rive** | Interactive animations with state machines ([LottieFiles](https://lottiefiles.com/blog/design-guides-and-tips/best-motion-design-tools-ranked-by-use-case.md)) | **Later:** characters and reactive icons, made by an animator |
| **Lottie** | After Effects animations as files. Plays them, but has no built-in state machines (same source) | Ready-made small animations |

## What top apps and games do
- **Duolingo (first party):** its team builds character animation in separate states ([Duolingo](https://blog.duolingo.com/world-character-visemes)). A team member says haptics are composed like sound, and warns against overuse: if everything is exciting, nothing is ([summary source](https://lilys.ai/notes/368931), not read in the original).
- **Clash Royale:** rewards build anticipation, and a single art style runs through type, animation and feedback ([GameGrin](https://www.gamegrin.com/articles/what-can-online-apps-learn-from-clash-royales-user-interface), [The Rookies](https://discover.therookies.co/2020/02/24/game-design-ux-best-practices-detailed-breakdown-of-clash-royale/)).
- **Brawl Stars:** high contrast, oversized icons, simple layouts and clear hierarchy ([Pixune](https://pixune.com/blog/best-examples-mobile-game-ui-design/), [Medium](https://medium.com/swlh/brawl-stars-what-makes-it-great-3861dfb169fb)).
- **What studios ask for:** Supercell wants motion that makes the interface "responsive, satisfying, and alive" ([job post](https://supercell.com/en/careers/senior-uxui-artist-clash-royale/54dd1d43-0075-496a-8948-a5f9375f5960/)). Other studios list reward sequences and transitions, and care about performance ([job post](https://jobs.workable.com/jobs/79fecb28-2079-43e9-8fc8-742af416a6d2.md)).
- **Material 3 Expressive:** spring physics replacing older easing, and morphing shapes. This came from third-party packages and not Google directly ([pub.dev](https://pub.dev/documentation/material_expressive/latest/)). Check [m3.material.io](https://m3.material.io) for official values.
- **Apple:** 44-point minimum touch targets (memory; check the [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines)).
- **Brilliant:** my searches found nothing. Anything on the reference page about it is my own observation from memory.

## Honest limit
No source gave exact press timing or squash values for any of these games. To learn those properly, someone should record the real apps in slow motion and measure them.

## Real screens to study
[Interface In Game](https://interfaceingame.com/) · [Game UI Database](https://www.gameuidatabase.com/) · [Mobbin](https://mobbin.com/) for apps
