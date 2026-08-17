# Signal

I’m looking at the component and template together so I can explain exactly how the signal and template binding line up in this Angular app.

## Why the fix worked

The key is that in Angular, `signal` is a function that creates a reactive value, not a type annotation.

In `app.ts`, this is the real pattern:

```ts
protected readonly title = signal('Dating apps');
protected members = signal<any>([]);
```

That works because:

- `signal('Dating apps')` creates a signal whose current value is `"Dating apps"`.
- `signal<any>([])` creates a signal whose current value is an empty array.
- The signal itself is stored on the class property.
- To read the value, you call it like a function: `title()` and `members()`.
- To update it, you call `set(...)` or `update(...)`.

So this line is valid:

```ts
next: (response) => this.members.set(response);
```

because `members` is a signal object, and `set()` is the method that updates its value.

---

## How the template reads it

In `app.html`, Angular uses the signal values like this:

```html
<h1>{{ title() }}</h1>

<ul>
  @for (member of members(); track member.id) {
  <li>{{ member.id }} - {{ member.displayName }}</li>
  }
</ul>
```

This works because:

- `{{ title() }}` means: “call the signal and print its current value.”
- `@for (member of members(); track member.id)` means: “call the signal, get the array, then loop over it.”

The parentheses are the important part:

- `title` is a signal, so `title()` gets the current value.
- `members` is a signal, so `members()` gets the current array.

---

## Why the original code failed

The broken version looked like this:

```ts
protected members: signal<any>([]);
```

This is wrong because:

- `:` in a class property means “declare a type”
- `signal<any>([])` is a function call, not a type
- TypeScript sees `signal<any>` as if it were a class/type, which causes the error

So the fix changed it from “type annotation + function call” to “signal creation + value assignment”:

```ts
protected members = signal<any>([]);
```

---

## A cleaner version

This is a little clearer:

```ts
protected members = signal<any[]>([]);
```

because now the signal is explicitly an array of `any`. The template still reads it the same way:

```html
@for (member of members(); track member.id) {
```

---

## Mental model

Think of a signal like a box with a current value:

- `signal(initialValue)` creates the box
- `box()` reads the current value
- `box.set(newValue)` replaces the value
- Angular re-renders when the value changes

So the combination of `app.ts` and `app.html` works because the component stores the data as a signal, and the template reads that signal by calling it as a function.
