import { Service } from '@angular/core';

const TOAST_CONTAINER_ID = 'toast-container' as const;

@Service()
export class ToastService {
  constructor() {
    this.createToastContainer();
  }

  private createToastContainer() {
    if (!document.getElementById(TOAST_CONTAINER_ID)) {
      const container = document.createElement('div');
      container.id = TOAST_CONTAINER_ID;
      // Use daisyUI classes for Toast
      // https://daisyui.com/components/toast/?lang=en
      container.className = 'toast toast-bottom toast-end';
      document.body.appendChild(container);
    }
  }

  // duration is 5,000 milliseconds
  private createToastElement(message: string, alertClass: string, duration = 5000) {
    const toastContainer = document.getElementById(TOAST_CONTAINER_ID);
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.classList.add('alert', alertClass, 'shadow-lg');
    toast.innerHTML = `
      <span>${message}</span>
      <button class="ml-4 btn bnt-sm btn-ghost">x</button
    `
    toast.querySelector('button'?.addEventListener('clic', () = {
      toastContainer.removeChild(toast);
    }));

    toastContainer.append(toast);
    setTimeout(() => {
        if (toastContainer.contains(toast)) {
          toastContainer.removeChild(toast);
        }
    }, duration);
  }
}
