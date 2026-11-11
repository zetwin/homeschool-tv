/* The looks children can choose. Each is original, in the style of a kind of game, with no copied art, names or logos.
   This is the only copy of the themes. After changing it, run: cp channel/views/themes.js channel/theme-kit/themes.js */
(function () {
  const LIST = [
  ['brick', 'Brick Studio', 'Building platforms. Default'],
  ['voxel', 'Block Craft', 'Survival block worlds. Default'],
  ['mine', 'Deep Mine', '2D crafting and digging worlds'],
  ['farm', 'Harvest Valley', 'Pixel farm games'],
  ['candy', 'Bubble Run', 'Bright party games'],
  ['crew', 'Space Crew', 'Bold crew games'],
  ['storm', 'Storm Season', 'Battle-royale menus'],
  ['arena', 'Toy Arena', 'Mobile strategy games'],
  ['realm', 'Ancient Realm', 'Dark fantasy battle games'],
  ['hero', 'Hero Academy', 'Team-shooter menus'],
  ['sky', 'Sky Journal', 'Open-world adventures'],
  ['cozy', 'Island Life', 'Cozy life games'],
  ['classic', 'Home School TV', 'Our first look'],
  ['pro', 'Clean Pro', 'Modern web apps, for parents'],
  ];
  const CSS = String.raw`
/* ---------- 1. Home School TV: our first look ---------- */
[data-t="classic"] { --font: 'DM Sans', sans-serif; --head: 'Bricolage Grotesque', sans-serif; --r: 16px; --rs: 12px; --rc: 6px; --ht: -.02em; }
[data-t="classic"][data-m="dark"] { --bg: #0B0910; --panel: #1B1626; --inp: #262033; --line: #3B3350; --tx: #FBFAFF; --mu: #C9C4D6; --acc: #D42A20; --accT: #fff; --acc2: #7E22CE; --sec: #FFC400; --secT: #17131F; --ok: #0F8F68; --no: #E5484D; --sel: #33294A; --title: #fff; color-scheme: dark; }
[data-t="classic"][data-m="light"] { --bg: #F5F4FA; --panel: #FFFFFF; --inp: #F0EEF6; --line: #DAD6E6; --tx: #17131F; --mu: #5E576E; --acc: #D42A20; --accT: #fff; --acc2: #1D4ED8; --sec: #FFC400; --secT: #17131F; --ok: #0F8F68; --no: #C9271F; --sel: #E8E4F2; --title: #17131F; color-scheme: light; }

/* ---------- 2. Ancient Realm: dark fantasy battle games ---------- */
[data-t="realm"] { --font: 'Alegreya Sans', sans-serif; --head: 'Cinzel', serif; --bf: 'Cinzel', serif; --hw: 800; --ht: .01em; --bw: 800; --bt: .02em; --r: 2px; --rs: 2px; --rc: 2px; --rw: 2px; --rt: 2px; --rb: 1px; --ra: 2px; --rk: 2px; --barH: 11px; --trk: 8px; --tabG: 1px; }
[data-t="realm"][data-m="dark"] { --bg: #0A0709; --bgi: radial-gradient(90vw 60vh at 50% -10%, #4A1712 0, #1A0B0D 45%, #0A0709 75%); --panel: #15100F; --panI: linear-gradient(180deg, #2A1E17, #120D0D 45%); --panB: 1px solid #8A6A32; --panX: 0 0 0 1px #000, inset 0 0 0 1px #FFE3A322, inset 0 0 40px #000A, 0 14px 30px #000C; --inp: #0E0A0A; --line: #5E4A28; --inB: 1px solid #5E4A28; --inS: inset 0 2px 7px #000C; --tx: #EFE2C8; --mu: #AD9C7E; --acc: #B0271A; --accT: #FFEFCF; --acc2: #6B3A16; --a2T: #FFE3A3; --aB: 1px solid #C79B4A; --sec: #2A1F17; --secT: #E8CE96; --secB: 1px solid #8A6A32; --btnB: 1px solid #E0B765; --btnS: inset 0 1px 0 #FF9A7A88, inset 0 -8px 14px #5A0C06, 0 0 16px #B0271A66, 0 2px 0 #000; --btxs: 0 1px 2px #000; --ok: #2B7A4B; --no: #A81F1F; --sel: #3B2A18; --selS: inset 2px 0 0 #E0B765; --title: #E9C77C; --barF: linear-gradient(90deg, #7A120C, #E5482F); --barX: 0 0 10px #E5482F; --thumb: #E0B765; color-scheme: dark; }
[data-t="realm"][data-m="light"] { --bg: #E9DCC0; --bgi: radial-gradient(90vw 50vh at 50% 0, #F7EEDB 0, #E9DCC0 60%, #D3C096 100%); --panel: #F6ECD6; --panI: linear-gradient(180deg, #FBF4E4, #EFE2C4); --panB: 1px solid #94702F; --panX: inset 0 0 0 3px #F6ECD6, inset 0 0 0 4px #B79A5C, 0 8px 18px #6B4A1440; --inp: #FFF9EC; --line: #B79A5C; --inB: 1px solid #A98B4C; --inS: inset 0 1px 4px #6B4A1433; --tx: #2F2011; --mu: #6E5A3A; --acc: #8E1E14; --accT: #FFF2D6; --acc2: #6B4A14; --a2T: #FFE9B8; --sec: #E8D5A8; --secT: #3A2710; --secB: 1px solid #94702F; --btnB: 1px solid #5E1209; --btnS: inset 0 1px 0 #E36A4C, inset 0 -7px 12px #5E1209, 0 2px 4px #6B4A1466; --ok: #2B7A4B; --no: #A81F1F; --sel: #EADBB8; --title: #6E1A10; --barF: linear-gradient(90deg, #8E1E14, #D1502E); --thumb: #6E1A10; color-scheme: light; }

/* ---------- 3. Storm Season: bright battle-royale menus ---------- */
[data-t="storm"] { --font: 'Barlow', sans-serif; --head: 'Barlow Condensed', sans-serif; --bf: 'Barlow Condensed', sans-serif; --hw: 900; --hs: italic; --hc: uppercase; --ht: 0; --hcq: uppercase; --bw: 800; --bs: italic; --bc: uppercase; --r: 4px; --rs: 3px; --rc: 3px; --rw: 3px; --rt: 2px; --rb: 2px; --ra: 4px; --rk: 2px; --trk: 12px; --barH: 14px; }
[data-t="storm"] .btn { font-size: 21px; padding-inline: 28px; clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%); }
[data-t="storm"] .btn.small { font-size: 16px; } [data-t="storm"] .btn.big { font-size: 28px; } [data-t="storm"] .btn.icon { padding: 0; width: 56px; }
[data-t="storm"] .panel h2 { font-size: 28px; } [data-t="storm"] .q { font-size: 32px; }
[data-t="storm"] .ans { clip-path: polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%); padding-left: 18px; }
[data-t="storm"] .tabs button { font-size: 19px; }
[data-t="storm"][data-m="dark"] { --bg: #120A4E; --bgi: radial-gradient(70vw 60vh at 80% 0, #7B2BEA 0, transparent 60%), radial-gradient(70vw 70vh at 0 100%, #0E6BEA 0, transparent 60%); --panel: #1B1178F0; --panB: 0; --panX: 0 10px 30px #0006, inset 0 3px 0 #5B8CFF66; --inp: #120B5C; --line: #4B3FC4; --inB: 0; --tx: #fff; --mu: #BFC4FF; --acc: #FFE81F; --accT: #1A0F6B; --acc2: #E81FBE; --sec: #2F7BFF; --secT: #fff; --btnS: inset 0 -5px 0 #D9A400; --secS: inset 0 -5px 0 #1956C9; --ok: #16D98C; --okT: #05301F; --no: #FF2E63; --sel: #342AB0; --title: #fff; --thumb: #fff; --barF: linear-gradient(90deg, #22E0FF, #FFE81F); color-scheme: dark; }
[data-t="storm"][data-m="light"] { --bg: #3FB4FF; --bgi: linear-gradient(170deg, #1E8DF5 0, #5BC8FF 42%, #D6F3FF 100%); --panel: #FFFFFFF2; --panB: 0; --panX: 0 10px 24px #0B4FA040, inset 0 -5px 0 #D6E8FA; --inp: #E6F2FF; --line: #A9CDF2; --inB: 0; --tx: #0D1F66; --mu: #44609A; --acc: #FFD60A; --accT: #0D1F66; --acc2: #7A2BEA; --sec: #1565E8; --secT: #fff; --btnS: inset 0 -5px 0 #E0A800; --secS: inset 0 -5px 0 #0D46AC; --ok: #0FBF7A; --okT: #052E1E; --no: #F01E55; --sel: #CFE5FF; --title: #1032A8; --thumb: #1032A8; --barF: linear-gradient(90deg, #1565E8, #16C5FF); color-scheme: light; }

/* ---------- 4. Block Craft: survival block worlds ---------- */
[data-t="voxel"] { --font: 'Nunito', sans-serif; --head: 'Jersey 20', monospace; --bf: 'Jersey 20', monospace; --hw: 400; --ht: 0; --fw: 700; --bw: 400; --r: 0; --rs: 0; --rc: 0; --rw: 0; --rt: 0; --rb: 0; --ra: 0; --rk: 0; --trk: 12px; --barH: 16px; --bgs: 96px 96px; --panS: 64px 64px; }
[data-t="voxel"] .btn { font-size: 21px; } [data-t="voxel"] .panel h2 { font-size: 24px; }
[data-t="voxel"][data-m="light"] { --bg: #6FB3F2; --bgi: linear-gradient(#6DB6F2, #A8DBFA 72%, #79B84A 72% 75%, #7A5230 75%); --bgs: auto; --panel: #C6C6C6; --panI: var(--texStone, none); --panB: 4px solid #1D1D1D; --panX: inset 4px 4px 0 #FFF, inset -4px -4px 0 #555; --inp: #8B8B8B; --line: #3B3B3B; --inB: 3px solid #1D1D1D; --inS: inset 3px 3px 0 #555, inset -3px -3px 0 #FFF; --tx: #1E1E1E; --mu: #3D3D3D; --acc: #5FA03A; --accT: #fff; --acc2: #8B5A2B; --sec: #AFAFAF; --secT: #1E1E1E; --btnB: 3px solid #1D1D1D; --btnS: inset 3px 3px 0 #9BD56B, inset -3px -3px 0 #2F6B14; --secS: inset 3px 3px 0 #E8E8E8, inset -3px -3px 0 #5C5C5C; --btxs: 2px 2px 0 #1D4A0C; --badS: inset 3px 3px 0 #F47474, inset -3px -3px 0 #7A1414; --ok: #3F8F2A; --no: #B3261E; --sel: #A6A6A6; --title: #1E1E1E; --thumb: #5C5C5C; --ansB: #DADADA; --ansS: inset 3px 3px 0 #fff, inset -3px -3px 0 #7D7D7D; --ansL: 3px solid #1D1D1D; --aB: 3px solid #1D1D1D; color-scheme: light; }
[data-t="voxel"][data-m="dark"] { --bg: #16161C; --bgi: var(--texDeep, none); --panel: #3A3A40; --panI: var(--texDark, none); --panB: 4px solid #000; --panX: inset 4px 4px 0 #6A6A72, inset -4px -4px 0 #1C1C20; --inp: #1E1E22; --line: #000; --inB: 3px solid #000; --inS: inset 3px 3px 0 #0E0E10, inset -3px -3px 0 #55555C; --tx: #F2F2F2; --mu: #BDBDC6; --acc: #2BB5A8; --accT: #04211E; --acc2: #6A3FB5; --sec: #55555C; --secT: #F2F2F2; --btnB: 3px solid #000; --btnS: inset 3px 3px 0 #7CEBDF, inset -3px -3px 0 #0E6A61; --secS: inset 3px 3px 0 #80808A, inset -3px -3px 0 #2C2C30; --badS: inset 3px 3px 0 #F47474, inset -3px -3px 0 #7A1414; --ok: #3FA82A; --no: #C8352B; --sel: #4C4C54; --title: #7CEBDF; --thumb: #BDBDC6; --ansB: #4A4A52; --ansS: inset 3px 3px 0 #70707A, inset -3px -3px 0 #26262A; --ansL: 3px solid #000; --aB: 3px solid #000; color-scheme: dark; }

/* ---------- 5. Brick Studio: bright building platforms ---------- */
[data-t="brick"] { --font: 'Rubik', sans-serif; --head: 'Rubik', sans-serif; --hw: 800; --bw: 700; --ht: -.015em; --r: 12px; --rs: 8px; --rc: 5px; --ra: 10px; --rw: 8px; --rt: 6px; --rb: 5px; --rk: 6px; }
[data-t="brick"][data-m="light"] { --bg: #F2F4F5; --panel: #FFFFFF; --panB: 0; --panX: 0 1px 3px #0000001F; --inp: #EBEDEF; --line: #D5D8DB; --inB: 0; --tx: #191B1D; --mu: #5B6066; --acc: #0B7BFF; --accT: #fff; --acc2: #E2231A; --sec: #191B1D; --secT: #fff; --ok: #00A862; --no: #E2231A; --sel: #E1ECFF; --title: #191B1D; --thumb: #0B7BFF; color-scheme: light; }
[data-t="brick"][data-m="dark"] { --bg: #111216; --panel: #1E2025; --panB: 0; --panX: 0 1px 2px #000; --inp: #2A2D33; --line: #3A3E45; --inB: 0; --tx: #F7F7F8; --mu: #AFB3B9; --acc: #2B8CFF; --accT: #fff; --acc2: #F0463E; --sec: #F7F7F8; --secT: #111216; --ok: #17C27C; --okT: #05301F; --no: #F0463E; --sel: #1C3558; --title: #fff; --thumb: #fff; color-scheme: dark; }

/* ---------- 6. Toy Arena: chunky mobile strategy games ---------- */
[data-t="arena"] { --font: 'Fredoka', sans-serif; --head: 'Lilita One', sans-serif; --bf: 'Lilita One', sans-serif; --hw: 400; --bw: 400; --ht: .005em; --r: 22px; --rs: 14px; --rc: 8px; --rk: 8px; --ra: 14px; --rt: 8px; --trk: 14px; --barH: 18px; }
[data-t="arena"] .btn { font-size: 20px; -webkit-text-stroke: .05em #0003; } [data-t="arena"] .panel h2 { font-size: 25px; text-shadow: 0 2px 0 #0004; } [data-t="arena"] .q { text-shadow: 0 2px 0 #0003; }
[data-t="arena"][data-m="light"] { --bg: #5CB8FF; --bgi: linear-gradient(#2B8EF0, #7BCBFF 55%, #CFEEFF); --panel: #2C5FD8; --panI: linear-gradient(#3D73EC, #2449BC); --panB: 4px solid #122462; --panX: 0 7px 0 #122462, 0 14px 20px #0B1F5C55, inset 0 2px 0 #8FB2FF; --inp: #173A9C; --line: #122462; --inB: 3px solid #122462; --inS: inset 0 3px 0 #0E2A78; --tx: #fff; --mu: #D0DEFF; --acc: #FFC21E; --accT: #3A2200; --acc2: #E5463A; --sec: #fff; --secT: #122462; --btnB: 3px solid #122462; --btnS: 0 5px 0 #122462, inset 0 2px 0 #FFF0A8, inset 0 -5px 0 #E08C00; --secS: 0 5px 0 #122462, inset 0 -5px 0 #BCCDEF; --badS: 0 5px 0 #122462, inset 0 -5px 0 #A81F16; --ok: #4CC93A; --okT: #06300A; --no: #E5463A; --sel: #1F4DBF; --title: #fff; --thumb: #FFC21E; --barF: linear-gradient(#FFE27A 0 45%, #F59E0B); --ansB: #fff; --ansT: #122462; --ansL: 3px solid #122462; --ansS: 0 4px 0 #122462, inset 0 -4px 0 #C9D7F2; --aB: 3px solid #122462; color-scheme: light; }
[data-t="arena"][data-m="dark"] { --bg: #0B1438; --bgi: radial-gradient(90vw 70vh at 50% 0, #27419F 0, #0B1438 70%); --panel: #182A73; --panI: linear-gradient(#233B96, #14235F); --panB: 4px solid #050B26; --panX: 0 7px 0 #050B26, 0 14px 20px #0007, inset 0 2px 0 #5F7FE0; --inp: #0D1A52; --line: #050B26; --inB: 3px solid #050B26; --inS: inset 0 3px 0 #070F36; --tx: #fff; --mu: #BCCBFA; --acc: #FFC21E; --accT: #3A2200; --acc2: #9B35E5; --sec: #E2E9FF; --secT: #0B1438; --btnB: 3px solid #050B26; --btnS: 0 5px 0 #050B26, inset 0 2px 0 #FFF0A8, inset 0 -5px 0 #E08C00; --secS: 0 5px 0 #050B26, inset 0 -5px 0 #AEBFEF; --badS: 0 5px 0 #050B26, inset 0 -5px 0 #A81F16; --ok: #4CC93A; --okT: #06300A; --no: #E5463A; --sel: #223A94; --title: #FFE27A; --thumb: #FFC21E; --barF: linear-gradient(#FFE27A 0 45%, #F59E0B); --ansB: #E9EFFF; --ansT: #0B1438; --ansL: 3px solid #050B26; --ansS: 0 4px 0 #050B26, inset 0 -4px 0 #AEBFEF; --aB: 3px solid #050B26; color-scheme: dark; }

/* ---------- 7. Hero Academy: clean team-shooter menus ---------- */
[data-t="hero"] { --font: 'Saira', sans-serif; --head: 'Saira Condensed', sans-serif; --bf: 'Saira Condensed', sans-serif; --hw: 800; --hc: uppercase; --ht: .01em; --bw: 700; --bc: uppercase; --bt: .03em; --r: 0; --rs: 0; --rc: 0; --rw: 0; --rt: 0; --rb: 0; --rk: 0; --ra: 0; --trk: 8px; --barH: 9px; }
[data-t="hero"] .panel { clip-path: polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 22px 100%, 0 calc(100% - 22px)); }
[data-t="hero"] .btn { clip-path: polygon(0 0, calc(100% - 11px) 0, 100% 11px, 100% 100%, 11px 100%, 0 calc(100% - 11px)); font-size: 18px; }
[data-t="hero"] .avatar { clip-path: polygon(0 0, 78% 0, 100% 22%, 100% 100%, 22% 100%, 0 78%); }
[data-t="hero"] .panel h2 { font-size: 24px; } [data-t="hero"] .q { font-size: 27px; text-transform: none; }
[data-t="hero"][data-m="light"] { --bg: #E7EEF6; --bgi: linear-gradient(115deg, #F7FAFD 0, #E7EEF6 50%, #CFDDEE 100%); --panel: #FFFFFF; --panB: 0; --panX: none; --inp: #EDF2F8; --line: #C4D2E2; --inB: 0; --tx: #1B2A3E; --mu: #5D7088; --acc: #F99E1A; --accT: #1B2A3E; --acc2: #218FFE; --sec: #1B2A3E; --secT: #fff; --ok: #12A66A; --no: #E23D47; --sel: #DCE7F3; --title: #1B2A3E; --thumb: #F99E1A; --barF: linear-gradient(90deg, #F99E1A, #FFC94D); color-scheme: light; }
[data-t="hero"][data-m="dark"] { --bg: #0D1626; --bgi: linear-gradient(115deg, #1A2942 0, #0D1626 60%); --panel: #1A2739; --panB: 0; --panX: none; --inp: #0F1927; --line: #33465F; --inB: 0; --tx: #EEF4FB; --mu: #9DB1C9; --acc: #F99E1A; --accT: #1B2A3E; --acc2: #218FFE; --sec: #EEF4FB; --secT: #0D1626; --ok: #15BE79; --okT: #03281A; --no: #F0525C; --sel: #2A3D57; --title: #fff; --thumb: #F99E1A; --barF: linear-gradient(90deg, #F99E1A, #FFC94D); color-scheme: dark; }

/* ---------- 8. Sky Journal: elegant open-world adventure menus ---------- */
[data-t="sky"] { --font: 'Mulish', sans-serif; --head: 'Marcellus', serif; --hw: 400; --ht: .005em; --bw: 600; --r: 10px; --rs: 22px; --rc: 5px; --rt: 4px; --rk: 50%; --ra: 50%; --trk: 6px; --barH: 7px; }
[data-t="sky"] .ans { border-radius: 10px; } [data-t="sky"] .in { border-radius: 8px; } [data-t="sky"] .panel h2 { font-size: 23px; }
[data-t="sky"][data-m="light"] { --bg: #EFE8D8; --bgi: linear-gradient(180deg, #D7EEF2 0, #EFE8D8 55%); --panel: #FBF7EC; --panB: 1px solid #D7C49A; --panX: inset 0 0 0 4px #FBF7EC, inset 0 0 0 5px #E7D9B6, 0 6px 22px #6B5A2F22; --inp: #F2EBDA; --line: #D7C49A; --inB: 1px solid #D7C49A; --tx: #3E4A52; --mu: #78807F; --acc: #2F8F97; --accT: #fff; --acc2: #C2994A; --sec: #EFE1BE; --secT: #5A4A22; --secB: 1px solid #C2994A; --btnB: 1px solid #1E6C73; --btnS: inset 0 1px 0 #7FD0D6; --ok: #5C9E4F; --no: #C05245; --sel: #E7F0EA; --title: #3C5C62; --thumb: #2F8F97; color-scheme: light; }
[data-t="sky"][data-m="dark"] { --bg: #101B2E; --bgi: radial-gradient(80vw 60vh at 50% -10%, #2A4468 0, #101B2E 70%); --panel: #1A2740F2; --panB: 1px solid #8D7A4E; --panX: inset 0 0 0 4px #1A2740, inset 0 0 0 5px #8D7A4E55, 0 8px 26px #0007; --inp: #101B2E; --line: #5F5A4D; --inB: 1px solid #5F5A4D; --tx: #EDE6D3; --mu: #B2AD9C; --acc: #E2C27A; --accT: #1A2333; --acc2: #3B8E9B; --sec: #24344F; --secT: #EDE6D3; --secB: 1px solid #8D7A4E; --btnS: inset 0 1px 0 #FFF0C8; --ok: #6DBB5E; --okT: #0C2607; --no: #D96557; --sel: #2A3A57; --title: #F2DFB0; --thumb: #E2C27A; color-scheme: dark; }

/* ---------- 9. Island Life: cozy life games ---------- */
[data-t="cozy"] { --font: 'Quicksand', sans-serif; --head: 'Nunito', sans-serif; --hw: 800; --fw: 600; --bw: 700; --r: 28px; --rs: 20px; --rc: 9px; --ra: 50%; --rk: 50%; --trk: 12px; --barH: 14px; --bgs: 26px 26px; }
[data-t="cozy"][data-m="light"] { --bg: #F7F1DE; --bgi: radial-gradient(#E5DABB 2px, transparent 2.5px); --panel: #FFFCF0; --panB: 0; --panX: 0 5px 0 #E7DDBD; --inp: #F5EDD6; --line: #E0D4B0; --inB: 0; --tx: #5A4A36; --mu: #8B7C66; --acc: #3CB6A3; --accT: #fff; --acc2: #F2914C; --sec: #F4E3A6; --secT: #5A4A36; --btnS: 0 4px 0 #24897A; --secS: 0 4px 0 #D9C278; --badS: 0 4px 0 #A83F34; --ok: #7CBF4A; --okT: #1E3A0A; --no: #E46A5E; --sel: #E6F4EF; --title: #4C7F76; --thumb: #F2914C; color-scheme: light; }
[data-t="cozy"][data-m="dark"] { --bg: #1E2A3A; --bgi: radial-gradient(#2C3B4F 2px, transparent 2.5px); --panel: #2C3B4F; --panB: 0; --panX: 0 5px 0 #17212E; --inp: #233142; --line: #41536B; --inB: 0; --tx: #F4EEDD; --mu: #BFC4C0; --acc: #5FD0BD; --accT: #113A33; --acc2: #F2B04C; --a2T: #3A2600; --sec: #46597A; --secT: #F4EEDD; --btnS: 0 4px 0 #2F9484; --secS: 0 4px 0 #2F3E58; --badS: 0 4px 0 #A83F34; --ok: #8DD05B; --okT: #1E3A0A; --no: #E98076; --sel: #34506B; --title: #A9EADF; --thumb: #F2B04C; color-scheme: dark; }

/* ---------- 11. Deep Mine: 2D crafting and digging worlds ---------- */
[data-t="mine"] { --font: 'Nunito', sans-serif; --head: 'Jersey 20', monospace; --bf: 'Jersey 20', monospace; --hw: 400; --ht: 0; --bw: 400; --r: 0; --rs: 0; --rc: 0; --rw: 0; --rt: 0; --rb: 0; --ra: 0; --rk: 0; --trk: 10px; --barH: 14px; --bgs: 96px 96px; }
[data-t="mine"] .btn { font-size: 21px; } [data-t="mine"] .panel h2 { font-size: 24px; }
[data-t="mine"][data-m="dark"] { --bg: #120D0A; --bgi: var(--texMine, none); --panel: #2B211B; --panB: 3px solid #0A0705; --panX: 0 0 0 2px #6B4E36 inset, 0 8px 18px #000A; --inp: #17110D; --line: #6B4E36; --inB: 2px solid #6B4E36; --tx: #F3E8DA; --mu: #BDAA96; --acc: #3CC8E8; --accT: #04242E; --acc2: #A855F7; --sec: #4A382A; --secT: #F3E8DA; --btnB: 2px solid #0A0705; --btnS: inset 0 3px 0 #A8EEFA, inset 0 -3px 0 #137F99; --secS: inset 0 3px 0 #7A6049, inset 0 -3px 0 #2B211B; --ok: #55C04A; --okT: #071F05; --no: #E5533D; --sel: #40301F; --title: #FFD76B; --thumb: #FFD76B; --barF: linear-gradient(90deg, #E5533D, #FFD76B); color-scheme: dark; }
[data-t="mine"][data-m="light"] { --bg: #8FCBEF; --bgi: linear-gradient(#67B5EC 0 55%, #7CB84B 55% 60%, #8A5F3A 60%); --panel: #EFE3CB; --panB: 3px solid #4A3320; --panX: inset 0 0 0 2px #FFF6E3, 0 6px 0 #4A332066; --inp: #FFF9EC; --line: #A98A62; --inB: 2px solid #A98A62; --tx: #33251A; --mu: #6B5845; --acc: #1E96B8; --accT: #fff; --acc2: #8B5CC9; --sec: #C9A878; --secT: #33251A; --btnB: 2px solid #4A3320; --btnS: inset 0 3px 0 #7DD6EE, inset 0 -3px 0 #0E6A85; --secS: inset 0 3px 0 #E8CFA3, inset 0 -3px 0 #8E6F44; --ok: #3F9A36; --no: #C93D2A; --sel: #E2CFA6; --title: #5A3A1E; --thumb: #1E96B8; color-scheme: light; }

/* ---------- 12. Harvest Valley: pixel farm games ---------- */
[data-t="farm"] { --font: 'Nunito', sans-serif; --head: 'Jersey 20', monospace; --bf: 'Jersey 20', monospace; --hw: 400; --ht: 0; --bw: 400; --r: 4px; --rs: 3px; --rc: 2px; --rw: 3px; --rt: 2px; --rb: 2px; --ra: 4px; --rk: 2px; --trk: 10px; --barH: 14px; }
[data-t="farm"] .btn { font-size: 21px; } [data-t="farm"] .panel h2 { font-size: 24px; }
[data-t="farm"][data-m="light"] { --bg: #8DBE5A; --bgi: linear-gradient(#A8D46B, #7FB24F); --panel: #F6D79A; --panB: 4px solid #6E3B18; --panX: inset 0 0 0 3px #E89A4A, inset 0 0 0 6px #F9E3B5, 0 6px 0 #4F2A10; --inp: #FBEBC4; --line: #B97434; --inB: 2px solid #B97434; --tx: #4A2810; --mu: #7D5430; --acc: #D9622B; --accT: #FFF6DF; --acc2: #4F9A3A; --sec: #F2C266; --secT: #4A2810; --btnB: 2px solid #6E3B18; --btnS: inset 0 3px 0 #F59A5C, inset 0 -3px 0 #9E3F12; --secS: inset 0 3px 0 #FBE09A, inset 0 -3px 0 #B97434; --ok: #4F9A3A; --no: #C23B22; --sel: #F2C985; --title: #6E3B18; --thumb: #D9622B; color-scheme: light; }
[data-t="farm"][data-m="dark"] { --bg: #16233F; --bgi: radial-gradient(#3A4F7A 1.5px, transparent 2px); --bgs: 34px 34px; --panel: #3A2A22; --panB: 4px solid #1C120C; --panX: inset 0 0 0 3px #8E5A2C, 0 6px 0 #0C0805; --inp: #2A1E18; --line: #8E5A2C; --inB: 2px solid #8E5A2C; --tx: #F8E7C7; --mu: #CDB48E; --acc: #F2B13C; --accT: #3A2204; --acc2: #6FB352; --sec: #5A4030; --secT: #F8E7C7; --btnB: 2px solid #1C120C; --btnS: inset 0 3px 0 #FFDE8A, inset 0 -3px 0 #B97A14; --secS: inset 0 3px 0 #80604A, inset 0 -3px 0 #3A2A22; --ok: #6FB352; --okT: #0F2607; --no: #D9533A; --sel: #4C372A; --title: #F2C96B; --thumb: #F2B13C; color-scheme: dark; }

/* ---------- 13. Bubble Run: bright party games ---------- */
[data-t="candy"] { --font: 'Fredoka', sans-serif; --head: 'Fredoka', sans-serif; --hw: 700; --bw: 700; --ht: -.005em; --r: 30px; --rs: 22px; --rc: 10px; --ra: 50%; --rk: 50%; --trk: 14px; --barH: 16px; }
[data-t="candy"] .btn { font-size: 18px; } [data-t="candy"] .panel h2 { font-size: 24px; }
[data-t="candy"][data-m="light"] { --bg: #FFC6EC; --bgi: radial-gradient(80vw 60vh at 15% 0, #A7E8FF 0, transparent 60%), radial-gradient(70vw 70vh at 100% 100%, #FFF09A 0, transparent 60%); --panel: #FFFFFF; --panB: 0; --panX: 0 8px 0 #F2A8DC, 0 16px 30px #C86AB033; --inp: #FBEFFA; --line: #F3CFEA; --inB: 0; --tx: #4B2A7A; --mu: #8A6BAF; --acc: #FF4FB0; --accT: #fff; --acc2: #27C4F2; --sec: #FFE45C; --secT: #4B2A7A; --btnS: 0 5px 0 #C72C85, inset 0 3px 0 #FF9AD5; --secS: 0 5px 0 #D9B400, inset 0 3px 0 #FFF4A8; --badS: 0 5px 0 #A81F3C; --ok: #1FCF8C; --okT: #06321F; --no: #FF4D6D; --sel: #FFE3F4; --title: #6A2BC9; --thumb: #FF4FB0; --barF: linear-gradient(90deg, #FF4FB0, #FFB02E); color-scheme: light; }
[data-t="candy"][data-m="dark"] { --bg: #24104F; --bgi: radial-gradient(80vw 60vh at 15% 0, #6D1FB5 0, transparent 60%), radial-gradient(70vw 70vh at 100% 100%, #0F5FB5 0, transparent 60%); --panel: #351A73; --panB: 0; --panX: 0 8px 0 #190A3D; --inp: #27125A; --line: #5A37A8; --inB: 0; --tx: #FFF4FF; --mu: #D4BDF5; --acc: #FF5CBA; --accT: #fff; --acc2: #2BD4FF; --sec: #FFE45C; --secT: #351A73; --btnS: 0 5px 0 #B3237A, inset 0 3px 0 #FFA3DC; --secS: 0 5px 0 #C9A800, inset 0 3px 0 #FFF4A8; --badS: 0 5px 0 #A81F3C; --ok: #1FCF8C; --okT: #06321F; --no: #FF4D6D; --sel: #4A2A96; --title: #FFE45C; --thumb: #FF5CBA; --barF: linear-gradient(90deg, #FF5CBA, #FFB02E); color-scheme: dark; }

/* ---------- 14. Space Crew: bold outline crew games ---------- */
[data-t="crew"] { --font: 'Rubik', sans-serif; --head: 'Rubik', sans-serif; --hw: 800; --bw: 800; --bc: uppercase; --bt: .02em; --hc: uppercase; --r: 14px; --rs: 10px; --rc: 5px; --rw: 10px; --ra: 12px; --rt: 6px; --rb: 5px; --rk: 6px; --trk: 12px; --barH: 16px; }
[data-t="crew"] .q { text-transform: none; }
[data-t="crew"][data-m="dark"] { --bg: #0A0F1F; --bgi: radial-gradient(#FFFFFF55 1px, transparent 1.5px); --bgs: 44px 44px; --panel: #1C2438; --panB: 4px solid #000; --panX: 0 5px 0 #000; --inp: #0E1426; --line: #000; --inB: 3px solid #000; --tx: #F5F7FF; --mu: #A9B2CC; --acc: #E8352E; --accT: #fff; --acc2: #2DA8FF; --sec: #F5F7FF; --secT: #0A0F1F; --btnB: 4px solid #000; --btnS: 0 4px 0 #000, inset 0 3px 0 #FF7A74; --secS: 0 4px 0 #000, inset 0 -3px 0 #B9C2DA; --badS: 0 4px 0 #000; --ok: #2FCB63; --okT: #052510; --no: #E8352E; --sel: #2B3550; --title: #fff; --thumb: #FFD93B; --barF: #2FCB63; --ansL: 3px solid #000; color-scheme: dark; }
[data-t="crew"][data-m="light"] { --bg: #D9E8FF; --bgi: radial-gradient(#9DBBEB 1.5px, transparent 2px); --bgs: 34px 34px; --panel: #FFFFFF; --panB: 4px solid #101426; --panX: 0 5px 0 #101426; --inp: #EDF3FF; --line: #101426; --inB: 3px solid #101426; --tx: #101426; --mu: #4D5875; --acc: #E8352E; --accT: #fff; --acc2: #2478E8; --sec: #FFD93B; --secT: #101426; --btnB: 4px solid #101426; --btnS: 0 4px 0 #101426, inset 0 3px 0 #FF7A74; --secS: 0 4px 0 #101426, inset 0 3px 0 #FFEFA3; --badS: 0 4px 0 #101426; --ok: #1FA94E; --no: #E8352E; --sel: #E0EAFF; --title: #101426; --thumb: #E8352E; --barF: #1FA94E; color-scheme: light; }

/* ---------- 10. Clean Pro: modern framework defaults, good for parents ---------- */
[data-t="pro"] { --font: 'Geist', sans-serif; --head: 'Geist', sans-serif; --hw: 600; --ht: -.02em; --bw: 500; --r: 10px; --rs: 6px; --rc: 4px; --rt: 6px; --rk: 4px; --ra: 50%; --trk: 6px; --barH: 8px; --fw: 400; }
[data-t="pro"][data-m="light"] { --bg: #FAFAFA; --panel: #FFFFFF; --inp: #FFFFFF; --line: #E4E4E7; --tx: #09090B; --mu: #71717A; --acc: #18181B; --accT: #FAFAFA; --acc2: #52525B; --sec: #F4F4F5; --secT: #18181B; --ok: #16A34A; --no: #DC2626; --sel: #F4F4F5; --thumb: #18181B; color-scheme: light; }
[data-t="pro"][data-m="dark"] { --bg: #09090B; --panel: #111113; --inp: #18181B; --line: #27272A; --tx: #FAFAFA; --mu: #A1A1AA; --acc: #FAFAFA; --accT: #18181B; --acc2: #52525B; --sec: #27272A; --secT: #FAFAFA; --ok: #22C55E; --okT: #052E16; --no: #EF4444; --sel: #27272A; --thumb: #FAFAFA; color-scheme: dark; }
`;
  const FONTS = 'https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@500;700;800&family=Barlow+Condensed:ital,wght@1,700;1,800;1,900&family=Barlow:wght@500;600;700&family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,800&family=Cinzel:wght@600;800&family=DM+Sans:opsz,wght@9..40,500;9..40,700&family=Fredoka:wght@500;600;700&family=Geist:wght@400;500;600;700&family=Lilita+One&family=Marcellus&family=Mulish:wght@500;600;700&family=Nunito:wght@600;700;800&family=Jersey+20&family=Quicksand:wght@500;600;700&family=Rubik:wght@500;600;700;800&family=Saira+Condensed:wght@600;700;800&family=Saira:wght@500;600;700&display=swap';
  /* Block Craft's and Deep Mine's textures are generated here: original pixel noise, not game assets. */
  function pixels(size, colors, scale = 4) {
    const c = document.createElement('canvas'); c.width = c.height = size * scale; const g = c.getContext('2d');
    for (let x = 0; x < size; x++) for (let y = 0; y < size; y++) { const r = (Math.sin(x * 127.1 + y * 311.7) * 43758.5) % 1; g.fillStyle = colors[Math.floor(Math.abs(r) * colors.length)]; g.fillRect(x * scale, y * scale, scale, scale); }
    return `url(${c.toDataURL()})`;
  }
  let ready = false;
  function prepare() {
    if (ready) return; ready = true;
    const style = document.createElement('style'); style.textContent = CSS; document.head.prepend(style);
    const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = FONTS; document.head.append(link);
    const root = document.documentElement.style;
    root.setProperty('--texStone', pixels(16, ['#C6C6C6', '#BEBEBE', '#CCCCCC', '#C2C2C2']));
    root.setProperty('--texDark', pixels(16, ['#3A3A40', '#36363C', '#3F3F46', '#333338']));
    root.setProperty('--texSky', 'linear-gradient(#5AA9F0, #A9D9FA)');
    root.setProperty('--texMine', pixels(24, ['#120D0A', '#17110C', '#0F0B08', '#1B140E']));
    root.setProperty('--texDeep', pixels(24, ['#16161C', '#1A1A21', '#121217', '#1D1D25']));
  }
  const SUN = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.500M12 19.500V22M2 12h2.500M19.500 12H22M4.900 4.900l1.800 1.800M17.300 17.300l1.800 1.800M4.900 19.100l1.800-1.800M17.300 6.700l1.800-1.800"/></svg>';
  const MOON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.500A8.500 8.500 0 1 1 9.500 4a7 7 0 0 0 10.500 10.500z"/></svg>';
  window.Theme = {
    LIST, SUN, MOON, DEFAULT: 'brick', prepare,
    /* Every child starts with the first default, and can change it. The choice belongs to their account, so it follows them to any device. */
    use(kid) {
      prepare();
      const t = LIST.some(([k]) => k === kid?.theme) ? kid.theme : this.DEFAULT, m = kid?.mode === 'dark' ? 'dark' : 'light', b = document.body;
      b.dataset.t = t; b.dataset.m = m;
      let btn = document.getElementById('themeMode');
      if (!btn) { btn = document.createElement('button'); btn.id = 'themeMode'; btn.className = 'mode'; document.body.append(btn); }
      btn.innerHTML = m === 'dark' ? SUN : MOON;
      btn.setAttribute('aria-label', m === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.hidden = false;
    },
    clear() { const b = document.body; delete b.dataset.t; delete b.dataset.m; const btn = document.getElementById('themeMode'); if (btn) btn.hidden = true; },
    tiles: (cur, mode) => LIST.map(([k, n, d]) => `<button class="tile" data-t="${k}" data-m="${mode}" data-pickt="${k}" aria-pressed="${k === cur}"><i></i><span><b>${n}</b><br><small>${d}</small></span></button>`).join(''),
  };
  /* Themes only belong to a child's own pages. Other pages clear them. */
  document.addEventListener('DOMContentLoaded', () => new MutationObserver(() => { if (document.body.dataset.surface && document.body.dataset.surface !== 'school' && document.body.dataset.t && !document.body.dataset.kit) window.Theme.clear(); }).observe(document.body, { attributes: true, attributeFilter: ['data-surface'] }));
})();
