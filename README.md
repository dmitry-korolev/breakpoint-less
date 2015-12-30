# breakpoint-less
Really simple media queries in LESS

#### Table of contents
1. [Usage](#usage)
1. [Vendor prefixes](#vendor-prefixes)
1. [Media queries concatenation](#media-queries-concatenation)

This simple lib does almost everything, that it's [inspirer](https://github.com/at-import/breakpoint) can. Quote:
> Create a variable using a simplified syntax based on most commonly used media queries, then call it using the `breakpoint` mixin.

There are two major differences between this library and breakpoint-sass. First, it doesn't (and, in my humble opinion, shouldn't) take care of vendor prefixes. Second, there is no way to get context as [here](https://github.com/at-import/breakpoint/wiki/Breakpoint-Context).

## Usage
First, include the main `_breakpoint.less` file like this:
```css
@import "lib/_breakpoint";
```
Second, use it! You can pass options to the mixin directly or by variables, that doesn't really matter.

#### Single value
```less
.test1 {
    .breakpoint(450px, {
        color: #fff;
    });
}
```
```css
@media only screen and (min-width: 450px) {
    .test1 {
        color: #fff;
    }
}
```

#### Two values
```less
.test2 {
    .breakpoint("450px 500px", {
        color: #fff;
    });
}
```
```css
@media only screen and (min-width: 450px) and (min-height: 500px) {
    .test2 {
        color: #fff;
    }
}
```

#### Property and value pair
```less
.test3 {
    .breakpoint("max-width 1000px", {
        color: #fff;
    });
}
```
```css
@media only screen and (max-width: 1000px) {
    .test3 {
        color: #fff;
    }
}
```

#### Several media rules
```less
.test4 {
    .breakpoint("(min-height 1000px) (orientation portrait)", {
        color: #fff;
    });
}
```
```css
@media only screen and (min-height: 1000px) and (orientation: portrait) {
    .test4 {
        color: #fff;
    }
}
```

#### Several media rules, one of which is a combined one
```less
.test5 {
    .breakpoint("(1000px 500px) (orientation portrait)", {
        color: #fff;
    });
}
```
```css
@media only screen and (min-width: 1000px) and (min-height: 500px) and (orientation: portrait) {
    .test5 {
        color: #fff;
    }
}
```
#### Type keywords
```less
.test6 {
    .breakpoint(300px, "not print", {
        color: #fff;
    });
}
.test7 {
    .breakpoint(300px, "all", {
        color: #fff;
    });
}
```
```css
@media not print and (min-width: 300px) {
    .test6 {
        color: #fff;
    }
}
@media only all and (min-width: 300px) {
    .test7 {
        color: #fff;
    }
}
```
#### Final example
```less
.breakpoint(300px, {
    .test8 {
        color: #fff;
    }
});
```
```css
@media only screen and (min-width: 300px) {
  .test8 {
    color: #fff;
  }
}
```

## Vendor prefixes
Breakpoint-less doesn't worry about cross-browser compatibility. Neither should you. Who should, you might ask? [Autoprefixer](https://github.com/postcss/autoprefixer).
```less
.test9 {
    .breakpoint("min-resolution 3dppx", {
        color: #fff;
    });
}
```
```css
/* Without autoprefixer */
@media only screen and (min-resolution: 3dppx) {
    .test9 {
        color: #fff;
    }
}

/* With autoprefixer */
@media only screen and (-webkit-min-device-pixel-ratio: 3), only screen and (min-resolution: 3dppx) {
    .test9 {
        color: #fff;
    }
}
```

## Media queries concatenation
LESS (just as SASS) has absolutely no internal way to combine media queries. Sorry, just no. But with the power of another PostCSS library - [CSS MQPacker](https://github.com/hail2u/node-css-mqpacker) - mission becomes possible:
```less
.test10 {
    .breakpoint(300px, {
        color: #fff;
    });
}
.test11 {
    .breakpoint(300px, {
        color: #fff;
    });
}
```
```css
@media only screen and (min-width: 300px) {
    .test10 {
        color: #fff
    }
    .test11 {
        color: #fff
    }
}
```
