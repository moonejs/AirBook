// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

document.addEventListener('DOMContentLoaded', () => {
  const alertEl = document.querySelector('.alert');

  if (alertEl) {
    // Add entry animation
    alertEl.classList.add('animate');

    // Wait 4 seconds, then fade out and remove
    setTimeout(() => {
      alertEl.classList.remove('show');
      alertEl.classList.add('fade-out');

      // Remove after animation ends
      alertEl.addEventListener('animationend', () => {
        alertEl.remove();
      });
    }, 4000);
  }
});



