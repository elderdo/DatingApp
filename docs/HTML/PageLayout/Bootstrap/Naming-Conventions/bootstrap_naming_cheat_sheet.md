# Bootstrap Atomic Naming & Layout Cheat Sheet

This cheat sheet explains the core patterns behind Bootstrap's utility classes, making them easy to remember without constant memorization.

---

## 1. The Spacing Formula (Margins & Padding)

Bootstrap uses a strict `[property][side]-[size]` structural formula.

### Formula Components:
*   **Property (`[property]`)**:
    *   `m` = **Margin** (space outside the border)
    *   `p` = **Padding** (space inside the border)
*   **Sides (`[side]`)**:
    *   `t` = **Top**
    *   `b` = **Bottom**
    *   `s` = **Start** (Left in LTR languages like English; Right in RTL)
    *   `e` = **End** (Right in LTR languages like English; Left in RTL)
    *   `x` = **Horizontal** (Both Left & Right / Start & End)
    *   `y` = **Vertical** (Both Top & Bottom)
    *   *(Blank)* = **All 4 sides**
*   **Sizes (`[size]`)**: `0` (none) to `5` (largest), plus `auto` for automatic margins.

### Examples:
*   `mt-3` $\rightarrow$ **M**argin **T**op - size **3**
*   `px-5` $\rightarrow$ **P**adding horizontal (**X**-axis) - size **5**
*   `mx-auto` $\rightarrow$ **M**argin horizontal (**X**-axis) - **Auto** (centers block elements)

---

## 2. Flexbox Horizontal Alignment (`justify-content-*`)

These utilities control how items are distributed horizontally along the row axis inside a flex container. 

*   **`justify-content-start`**: Aligns items to the **very beginning** of the container. All extra space goes to the end.
*   **`justify-content-end`**: Aligns items to the **very end** of the container. All extra space goes to the beginning.

### Why "Start" and "End"?
Bootstrap avoids "left" and "right" to inherently support **Right-to-Left (RTL)** languages. 
*   **In standard English (LTR):** `start` is the Left side; `end` is the Right side.
*   **In RTL languages (e.g., Arabic, Hebrew):** `start` automatically flips to the Right side; `end` flips to the Left.

```text
justify-content-start (English Layout):
|[Box 1][Box 2][Box 3]                             |
^                                                  ^
Items start here (Left)               Empty space (Right)

justify-content-end (English Layout):
|                             [Box 1][Box 2][Box 3]|
^                                                  ^
Empty space (Left)                     Items end here (Right)
```

---

## 3. Sizing (Width & Height)

Quickly size items using fixed percentage-based fractions.

*   **Width (`w-`)**: `w-25` (25%), `w-50` (50%), `w-75` (75%), `w-100` (100%), and `w-auto`.
*   **Height (`h-`)**: `h-25`, `h-50`, `h-75`, `h-100`, and `h-auto`.

---

## 4. Borders

Add, remove, or modify borders intuitively.

*   **Add/Remove:** `border` (all sides), `border-top`, `border-0` (removes all borders), `border-bottom-0`.
*   **Theme Colors:** `border-primary`, `border-success`, `border-danger`.
*   **Rounding:** `rounded` (subtle corners), `rounded-circle` (perfect circle), `rounded-top`.

---

## Quick Reference Comparison Table

| CSS Property | Bootstrap Equivalent | Layout Effect Pattern |
| :--- | :--- | :--- |
| `margin-top: 1rem;` | `mt-3` | **m**argin + **t**op + size 3 |
| `padding-left: 1.5rem;` | `ps-4` | **p**adding + **s**tart (left) + size 4 |
| `width: 50%;` | `w-50` | **w**idth + 50% fraction |
| `border-radius: 50%;` | `rounded-circle` | **rounded** geometry shape |
| `margin: 0 auto;` | `mx-auto` | **m**argin + **x**-axis + **auto** centering |
| `justify-content: flex-start;` | `justify-content-start` | Flex items align to standard alignment **start** |
| `justify-content: flex-end;` | `justify-content-end` | Flex items align to standard alignment **end** |
