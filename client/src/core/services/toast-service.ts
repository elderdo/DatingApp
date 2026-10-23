import { Service } from '@angular/core';

@Service()
export class ToastService {
  /**
   * 1. THE STATIC CONSTANT
   * We use 'private static readonly' to create a variable that belongs to the class itself,
   * can only be seen inside this file (private), and cannot be changed later (readonly).
   * This holds the HTML ID string for our main toast container element.
   */
  private static readonly TOAST_CONTAINER_ID = 'toast-container';

  /**
   * 2. THE ALERTS CLASS MAP (The "Dictionary")
   * This object acts like a lookup dictionary.
   * - The words on the left ('success', 'error') are keys we use in our code.
   * - The text on the right ('alert-success') are the actual CSS classes from daisyUI.
   * By putting 'as const' at the end, we tell TypeScript that these exact words will
   * never change, which allows TypeScript to help us prevent typos.
   */
  private readonly alertClasses = {
    success: 'alert-success',
    error: 'alert-error',
    warning: 'alert-warning',
    info: 'alert-info',
  } as const;

  /**
   * 3. THE CONSTRUCTOR
   * This is a special function that runs automatically the exact moment this service
   * is created by the application. We use it to set up our HTML container on the screen.
   */
  constructor() {
    this.createToastContainer();
  }

  /**
   * 4. CREATING THE MAIN CONTAINER
   * This function checks if our toast container exists on the web page.
   * If it doesn't, it creates a invisible "holder" box and sticks it to the screen.
   */
  private createToastContainer() {
    // Look for an existing element on the web page with our container ID
    if (!document.getElementById(ToastService.TOAST_CONTAINER_ID)) {
      // If it doesn't exist, create a new HTML 'div' element in memory
      const container = document.createElement('div');

      // Assign our unique ID to this new div
      container.id = ToastService.TOAST_CONTAINER_ID;

      // Give it daisyUI styles so it automatically floats at the bottom-right corner
      container.className = 'toast toast-bottom toast-end';

      // Physically attach this new box to the very bottom of the web page body
      document.body.appendChild(container);
    }
  }

  /**
   * 5. GENERATING AN INDIVIDUAL TOAST POPUP
   * This is the engine room. It takes a text message, a specific daisyUI theme class,
   * and a display duration, then puts the visual alert on the screen and removes it later.
   */
  private createToastElement(message: string, alertClass: string, duration = 5000) {
    // Find our main container box on the page
    const toastContainer = document.getElementById(ToastService.TOAST_CONTAINER_ID);
    if (!toastContainer) return; // If the container isn't found, stop here and do nothing

    // Create a new div element for the individual alert message box
    const toast = document.createElement('div');

    // Add the base styles from daisyUI ('alert' makes the layout, 'shadow-lg' adds a shadow)
    // and inject the dynamic 'alertClass' (like 'alert-success' or 'alert-error') for coloring
    toast.classList.add('alert', alertClass, 'shadow-lg');

    // Fill the alert box with HTML code: a span for the text, and a small button to close it
    toast.innerHTML = `
      <span>${message}</span>
      <button class="ml-4 btn btn-sm btn-ghost">x</button>
    `;

    // Set up the close "x" button behavior
    // The '?.' ensures code doesn't crash if the button wasn't found for some reason
    toast.querySelector('button')?.addEventListener('click', () => {
      // If the user clicks the 'x', instantly remove this specific toast box from the container
      toastContainer.removeChild(toast);
    });

    // Append our newly styled toast pop-up into the main container box on the screen
    toastContainer.append(toast);

    // Set a timer to automatically delete this toast after the duration passes (default 5 seconds)
    setTimeout(() => {
      // Double check that the toast is still there before trying to delete it
      if (toastContainer.contains(toast)) {
        toastContainer.removeChild(toast);
      }
    }, duration);
  }

  /**
   * 6. THE INTERNAL ROUTER METHOD
   * Instead of writing repetitive code for success, error, etc., we route them all through here.
   * 'keyof typeof this.alertClasses' is TypeScript magic that means: "The 'type' parameter
   * MUST be one of the four exact keys inside our dictionary map: 'success', 'error', 'warning', or 'info'".
   */
  private show(type: keyof typeof this.alertClasses, message: string, duration?: number) {
    // We look up the design class by passing the key name to our dictionary map.
    // Example: this.alertClasses['success'] outputs the string 'alert-success'
    const designClass = this.alertClasses[type];

    // Send the message, the resolved daisyUI class name, and the timer duration to the builder engine
    this.createToastElement(message, designClass, duration);
  }

  /**
   * 7. PUBLIC API METHODS
   * These are the clean, simple methods you will actually type in your other Angular
   * components whenever you want a toast popup to appear.
   * They simply call the internal .show() router and tell it what style key to look up.
   */

  // Triggers a green success popup
  success(message: string, duration?: number) {
    this.show('success', message, duration);
  }

  // Triggers a red error popup
  error(message: string, duration?: number) {
    this.show('error', message, duration);
  }

  // Triggers a yellow warning popup
  warning(message: string, duration?: number) {
    this.show('warning', message, duration);
  }

  // Triggers a blue informational popup
  info(message: string, duration?: number) {
    this.show('info', message, duration);
  }
}
