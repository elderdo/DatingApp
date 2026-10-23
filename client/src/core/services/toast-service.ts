import { Service } from '@angular/core';

@Service()
export class ToastService {
  private static readonly TOAST_CONTAINER_ID = 'toast-container';

  constructor() {
    this.createToastContainer();
  }

  private createToastContainer() {
    if (!document.getElementById(ToastService.TOAST_CONTAINER_ID)) {
      const container = document.createElement('div');
      container.id = ToastService.TOAST_CONTAINER_ID;
      // Use daisyUI classes for Toast to place it at the bottom right of
      // the main window.
      // see https://daisyui.com/components/toast/?lang=en
      container.className = 'toast toast-bottom toast-end';
      document.body.appendChild(container);
    }
  }

  // duration is 5,000 milliseconds - i.e. 5 seconds
  private createToastElement(message: string, alertClass: string, duration = 5000) {
    const toastContainer = document.getElementById(ToastService.TOAST_CONTAINER_ID);
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.classList.add('alert', alertClass, 'shadow-lg');
    toast.innerHTML = `
      <span>${message}</span>
      <button class="ml-4 btn btn-sm btn-ghost">x</button>
    `;
    toast.querySelector('button')?.addEventListener('click', () => {
      toastContainer.removeChild(toast);
    });

    toastContainer.append(toast);
    setTimeout(() => {
      if (toastContainer.contains(toast)) {
        toastContainer.removeChild(toast);
      }
    }, duration);
  }
}
